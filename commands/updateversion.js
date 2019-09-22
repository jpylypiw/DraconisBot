/* Modules */
const Discord = require("discord.js");
const fs = require("fs");
const moment = require("moment");

/* Data */

/* Define */

module.exports.run = async (bot, message, args, botconfig, dcuser) => {

if(message.author.id === "289880765859364864") {
    
    let date = moment().format('DDMMYYYY');

    let msg = message.content;
    let geschliffen = msg.slice(15);

    console.log(geschliffen)

    if(geschliffen === "") {
        message.channel.send("**Bitte gib eine Version an: `.updateversion <Build 1.0>`**")
    } else {
        botconfig["version"].date = date;
        botconfig["version"].version = geschliffen;
    
        message.channel.send(`**Version aktualisiert!**`);
    }

} else {
    message.channel.send(`**Du bist dazu nicht berechtigt!**`)
}

// Write Files Botconfig
fs.writeFile("./data/settings/botconfig.json", JSON.stringify(botconfig, null, 4), (err) => {
    if(err) console.log(err)
});

}
 
module.exports.help = {
  name: "updateversion"
}