/* Modules */
const Discord = require("discord.js");

/* Data */

/* Define */

module.exports.run = async (bot, message, args, botconfig, dcuser) => {

  let test = new Discord.RichEmbed()
    .setFooter(`${botconfig["version"].version} | ${botconfig["version"].date}`)
    .setColor(botconfig["colors"].rot)
  message.channel.send(test);

}

module.exports.help = {
  name: "blank"
}