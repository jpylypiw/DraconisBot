/* Modules */
const Discord = require("discord.js");

/* Require */

/* Data */

/* Define */

module.exports.run = async (bot, message, args, botconfig) => {

  bot.fetchUser(`289880765859364864`).then(myUser => {
    let help = new Discord.RichEmbed()
    .setAuthor(`${bot.user.username} Discord Bot:`)
    .setDescription(`Für eine Übersicht der Commands, nutze bitte **.help**`)
    .setThumbnail(bot.user.avatarURL)
    .addField(`Über den Bot:`, `Dies ist ein Privater Bot, welcher nur für die Verwaltung des Servers **Drachinus** und **Amarok** dient.`, true)
    .addField(`Autor:`, `Wendet euch bei Fragen bitte an **@${myUser.tag}**`, true)
    .setFooter(`${botconfig["version"].version} | ${botconfig["version"].date}`)
    .setColor(botconfig["colors"].rot)
    message.channel.send(help);
  })

}
 
module.exports.help = {
  name: "info"
}