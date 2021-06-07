require('dotenv').config();
const Discord = require('discord.js')
const bot = new Discord.Client();
const commandHandler = "!";
const token = process.env.TOKEN;
console.log(token)

const fetch = require('node-fetch');
const { loadavg } = require('node:os');

bot.once('ready',()=> {
    console.log("Bot is now online")
})

bot.on("message", message => {
if(!message.content.startsWith(commandHandler) || message.author.bot) return;

 const agruments = message.content.slice(commandHandler.length).split(/ +/);
 const command = agruments.shift().toLowerCase();

if(command === "ping") {
    message.channel.send('>>> pong!');
}

else if(command === "commands") {
const commandList = `!ping 
!weather <city> 
!bin <BIN>
!dict <word>`;
message.channel.send(`>>> ${commandList}`);
}

///Weather Command
else if(command === "weather") {
    const apiKey = "89ef8a05b6c964f4cab9e2f97f696c81"; 
    const kelvin = 273; 
    let location = capitalizeFirstLetter(agruments[0])
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;
    fetch(api)
    .then(resposne => resposne.json())
    .then(data => {

 let weather = data['weather'][0]['main'];
 let description = data['weather'][0]['description'];
 let temp = data['main']['temp'];
     temp = temp - kelvin;
 let feels_like = data['main']['feels_like'];
 let country = data['sys']['country'];
 let name = data['name'];
 let feels = feels_like - kelvin;

let weatherSatus = `Weather at ${name}: ${weather}
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
    let bin = agruments[0];
    fetch(`https://binssuapi.vercel.app/api/${bin}`)
    .then(resposne => resposne.json())
    .then(data => {
        let bank = data['data']['bank'];
        let country = data['data']['country'];
        let brand = data['data']['vendor'];
        let level = data['data']['level'];
        let type = data['data']['type'];
        let flag = data['data']['countryInfo']['emoji'];

        let binData = `Bin: ${bin}
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

else if(command === "dict") {
    let dict = agruments[0];
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${dict}`)
    .then(resposne => resposne.json())
    .then(data=> {
       let n = data[0].meanings;
       let definition = "";
       let example = "";
           for(i = 0; i < n.length; i++) {
              definition += (i+1) + ": " + data[0].meanings[i].definitions[0].definition + "\n";
              example += (i+1) + ": " + data[0].meanings[i].definitions[0].example + "\n";
           }
        let dictMeanings = `Definition: \n${definition}
                           \nExamples: \n${example}`
             message.channel.send(`>>> ${dictMeanings}`)
    })
    .catch(error => {
  console.error('Error:', error);
  message.reply("Invalid Input")
});  
}

else if(command === "time"){
    let d = new Date();
    let h = d.getHours();
    let m = d.getMinutes();
    let s = d.getSeconds();
    let time = `${h}:${m}:${s}`
    message.channel.send(`>>> ${time} IST`)
}

else if(command === "ban"){
    if(!agruments[0]){
        message.channel.send(">>> No username provided")
    }
    else {
        const user = message.mentions.users.first();
        if(user){
            const member = member.guild.member(user);
            if(member){
                member.kick();
            }
        }

    }
    
}




})

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  

bot.login(token)

