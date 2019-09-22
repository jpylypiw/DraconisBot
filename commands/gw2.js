/* Modules */
const Discord = require("discord.js");
const fs = require("fs");
const moment = require("moment");
const fetch = require("node-fetch");

/* Data */

/* Define */
const gw2api = "https://api.guildwars2.com/v2/"
const gw2apiAchivements = gw2api + "achievements/"
const gw2apiDailys = gw2api + "achievements/daily/"

module.exports.run = async (bot, message, args, botconfig) => {

    moment.locale()
    
    let gw2embed = new Discord.RichEmbed()

    gw2embed.setFooter(`${botconfig["version"].version} | ${botconfig["version"].date}`)
    gw2embed.setColor(botconfig["colors"].dunkelblau)

if (args[0] === undefined) {
    gw2embed.setAuthor("Please specify your action:")
    gw2embed.setDescription("`.gw2 daily`")
    message.channel.send(gw2embed)
} else if(args[0].toLowerCase() === `daily`) {

    // Wait till you get response, then move on
    var i
    i = 0
    waitAndDo(15)
    function waitAndDo(times) {
        if(times < 1) {
          return;
        }
    
        setTimeout(function() {
      
          let j = i++

          fetch(gw2apiDailys)
            .then(res => res.json())
            .then(gw2dailyjson => {
                let gw2dailyFracID = gw2dailyjson["fractals"][j].id
                fetch(gw2apiAchivements + gw2dailyFracID + "?lang=de")
                  .then(res2 => res2.json())
                  .then(async json2 => {
                    let str = json2.name
                    let str2 = str.replace(/Rang/, "Tier")
                    await message.channel.send(`**${str2}**`)
                  })
            })
          
          waitAndDo(times-1);
        }, 1000);
      }
        
} else {
    gw2embed.setAuthor("Please specify your action:")
    gw2embed.setDescription("`.gw2 daily`")
    message.channel.send(gw2embed)
}

}
 
module.exports.help = {
  name: "gw2"
}