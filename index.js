require('dotenv').config();
const Discord = require('discord.js')
const bot = new Discord.Client();
const commandHandler = "!";
const token = process.env.TOKEN;

const fetch = require('node-fetch');

bot.once('ready',()=> {
    console.log(`Bot is now online ${bot.user.tag}`)
})

bot.on("message", message => {
if(!message.content.startsWith(commandHandler) || message.author.bot) return;

 const agruments = message.content.slice(commandHandler.length).split(/ +/);
 const command = agruments.shift().toLowerCase();
 
if(command === "ping") {
    message.channel.send(`>>> pong!`);
}

//command
else if(command === "commands") {
const commandList = `!ping 
!time
!cryptorate
!weather <city> 
!bin <BIN>
!dict <word>
!git <github_username>
!syt <query>
`;
message.channel.send(`>>> ${commandList}`);
}

///Weather Status
else if(command === "weather") {
    const apiKey = "89ef8a05b6c964f4cab9e2f97f696c81"; 
    const kelvin = 273; 
    var location = capitalizeFirstletter(agruments[0])
    var api = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;
    fetch(api)
    .then(resposne => resposne.json())
    .then(data => {

 var weather = data['weather'][0]['main'];
 var description = data['weather'][0]['description'];
 var temp = data['main']['temp'];
     temp = temp - kelvin;
 var feels_like = data['main']['feels_like'];
 var country = data['sys']['country'];
 var name = data['name'];
 var feels = feels_like - kelvin;

var weatherSatus = `Weather at ${name}: ${weather}
Status: ${description}
Temp : ${temp} °C
Feels Like : ${feels} °C
Country: ${country} `;
     message.channel.send(`>>> ${weatherSatus}`)
    })
    .catch(error => {
        console.error('Error:', error);
        message.reply("Invalid City");
      });
}

///BIN Checker 
else if(command === "bin"){
    var bin = agruments[0];
    fetch(`hhttps://bins-api.vercel.app/api/${bin}`)
    .then(resposne => resposne.json())
    .then(data => {
        var bank = data['data']['bank'];
        var country = data['data']['country'];
        var brand = data['data']['vendor'];
        var level = data['data']['level'];
        var type = data['data']['type'];
        var flag = data['data']['countryInfo']['emoji'];

        var binData = `Bin: ${bin}
Brand: ${brand}
Level: ${level}
Bank: ${bank}
Type:${type}
Country: ${country} ${flag}`;
        message.channel.send(`>>> ${binData}`)

    })
    .catch(error => {
        console.error('Error:', error);
        message.reply("Invalid BIN");
      });
}


//Flag
else if(command === "getflag"){
    argsconcat = "";
    for(i=0;i< agruments.length; i++) {
        argsconcat += agruments[i]+ " ";
    }
    let  flag = argsconcat;
    console.log(flag)
    fetch(`https://flagapi.herokuapp.com/api/flagName/${flag}`)
    .then(resposne => resposne.json())
    .then(data => {
        let name = data.name
        let unicode = data.unicode
        let code = data.code
        let flag = data.flag
      

        var flagInfo = `Name: ${name}
Unicode: ${unicode}
Code: ${code}
Flag: ${flag}`;
        message.channel.send(`>>> ${flagInfo}`)

    })
    .catch(error => {
        console.error('Error:', error);
        message.reply("Invalid Flag");
      });
}


//Flag
else if(command === "flag"){
    var flag = encodeURI(agruments[0]);
    console.log(flag)
    fetch(`https://flagapi.herokuapp.com/api/flag/${flag}`)
    .then(resposne => resposne.json())
    .then(data => {
        let name = data.name
        let unicode = data.unicode
        let code = data.code
        let flag = data.flag
      

        var flagInfo = `Name: ${name}
Unicode: ${unicode}
Code: ${code}
Flag: ${flag}`;
        message.channel.send(`>>> ${flagInfo}`)

    })
    .catch(error => {
        console.error('Error:', error);
        message.reply("Invalid Flag");
      });
}


///Dictionary
else if(command === "dict") {
    var dict = agruments[0];
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${dict}`)
    .then(resposne => resposne.json())
    .then(data=> {
       var n = data[0].meanings;
       var definition = "";
       var example = "";
           for(i = 0; i < n.length; i++) {
              definition += (i+1) + ": " + data[0].meanings[i].definitions[0].definition + "\n";
              example += (i+1) + ": " + data[0].meanings[i].definitions[0].example + "\n";
           }
        var dictMeanings = `Definition: \n${definition}
                           \nExamples: \n${example}`
             message.channel.send(`>>> ${dictMeanings}`)
    })
    .catch(error => {
  console.error('Error:', error);
  message.reply("Invalid Input")
});  
}


///Time
else if(command === "time"){
    var d = new Date();
    var h = d.getHours();
    var m = d.getMinutes();
    var s = d.getSeconds();
    var time = `${h}:${m}:${s}`
    message.channel.send(`>>> ${time} IST`)
}


///Echo
else if(command === "echo"){
    var echo = "";
    for(i =0; i < agruments.length; i++ ){
        echo += agruments[i]+ " ";
    }
    message.channel.send(echo)
}
 else if(command === "start"){
     message.channel.send(">>> Hello I am Kakashi Hatake a bot made in Node.js")
 }


///Youtube Search
 else if(command === "syt"){
     var syt = ""
    for(i =0; i < agruments.length; i++ ){
        syt += "+" + agruments[i];
    }
    var query = `https://www.youtube.com/results?search_query=${syt}`

    message.channel.send(`>>> ${query}`)
 }

////Github
else if(command === "git"){
    var git = agruments[0];
    fetch(`https://api.github.com/users/${git}`)
    .then(resposne => resposne.json())
    .then(data => {
        var gusername = data['login'];
        var glink = data['html_url'];
        var gname = data['name'];
        var gcompany = data['company'];
        var blog = data['blog'];
        var gbio = data['bio'];
        var grepo = data['public_repos'];
        var gfollowers = data['followers'];
        var gfollowings = data['following'];

        var gitData = `Name: ${gname}
Username: ${gusername}
Bio: ${gbio}
Followers: ${gfollowers}
Following : ${gfollowings}
Repositories: ${grepo}
Website: ${blog}
Company: ${gcompany}
Github url: ${glink}`

        message.channel.send(`>>> ${gitData}`)

    })
    .catch(error => {
        console.error('Error:', error);
        message.reply("Invalid Username");
      });
    }


/// Crypto Rate
else if(command === "cryptorate"){
    message.channel.send(`>>> Prices are fetched from Coinbase API.
use !rate <coinname> to check current crypto rate.
eg: !rate btc or !rate eth`)
}

else if(command === "rate"){
    var crypto = agruments[0].toUpperCase();
    var coinbaseApi = `https://api.coinbase.com/v2/prices/${crypto}-USD/spot`

    fetch(coinbaseApi)
    .then(response => response.json())
    .then(data => {

     var cryptoRate = data['data']['amount'];
     var cryptoData = `1 ${crypto}
USD = ${cryptoRate}`
      
     message.channel.send(`>>> ${cryptoData}`)

    })
    .catch(error => {
        console.error('Error:', error);
        message.reply(`Error: ${error}`);
      });

}



//////------

})

function capitalizeFirstletter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  

bot.login(token)

