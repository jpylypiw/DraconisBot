/* Modules */
const Discord = require("discord.js");

/* Require */

/* Data */

/* Define */

module.exports.run = async (bot, message, args, botconfig, dcuser) => {

  bot.fetchUser(`289880765859364864`).then(myUser => {
    let help = new Discord.RichEmbed()
    .setAuthor(`${bot.user.username} Discord Bot:`)
    .setDescription(`Für eine Übersicht der Commands, nutze bitte **.help**`)
    .setThumbnail(bot.user.avatarURL)
    .addField(`Über den Bot:`, `Dies ist (bis jetzt) ein Privater Bot, welcher für die Verwaltung einiger kleiner Server dient.`, true)
    .addField(`Autor:`, `Wendet euch bei Fragen bitte an **@${myUser.tag}**`, true)
    .setFooter(`${botconfig["version"].version} | ${botconfig["version"].date}`)
    .setColor(botconfig["colors"].rot)
    message.channel.send(help);
  })

}
 
module.exports.help = {
  name: "info"
}