/* Modules */
const Discord = require("discord.js");

/* Data */
const userData = require("../data/rpg/userdata.json");

/* Define */

module.exports.run = async (bot, message, args, botconfig) => {

  let player = message.author.id
  let help = new Discord.RichEmbed()

  if(args[0] === undefined) {

    // General Help
    help.setAuthor(`Definiere deine Hilfe:`)
    help.addField(`RPG Commands:`, "`.help rpg`", true)
    help.addField(`Auto Channel:`, "`.help ac`", true)
    help.addField(`Music:`, "`.help music`", true)
    help.addField(`Info:`, "Für eine kleine Info über den Bot führe bitte `.info` aus!")

  } else if(args[0].toLowerCase() === `rpg`) {

    // Help for RPG Commands 
    help.setAuthor(`RPG Commands:`)
    help.addField("Pets", "`.pet` um alle Befehle für dein Pet zu sehen!")

  } else if(args[0].toLowerCase() === `ac`) {

    // Help for Auto-Channel
    help.setAuthor(`Auto-Channel Hilfe:`)
    help.addField("Was ist ein Auto Channel?", "Auto Channel sind automatisch erstellte channel, welche erscheinen, " + 
    "sobald man einen **PARENT** Channel betritt. Dieser verschiebt dich außerdem sofort in den neu erstellten Channel.")
    help.addField("Wie mache ich einen Parent Channel?","Um einen Parent Channel zu erstellen, musst du einfach nur " + 
    "einen Emoji an den **Anfang** eines Channels setzen. \nDiese Emojis und ihre Fähigkeiten werden aktuell unterstützt:")
    help.addField("👥 am Anfang des Channels", "Beginnt der Parent Channel mit diesem Emoji, so wird der **Nutzername** " + 
    "als Auto Channel Name genommen!")
    help.addField("🎮 am Anfang des Channels", "Beginnt der Parent Channel mit diesem Emoji, so wird das **gespielte Spiel " + 
    "des Channel Owners** (der erste, der den Channel betritt) als Auto Channel Name genommen! Ändert dieser sein Spiel, so ändert " +
    "sich auch der Name des Channels!")
    help.addField("Auto Channel löschen.", "Wenn der **letzte Nutzer** den Auto Channel verlässt, löscht sich der Channel selber.")
    help.addField("Wie bearbeite ich die Rechte und Größe der Auto Channel?", "Die Rechte und Größe der Auto Channel " + 
    "werden von dem **Parent** Channel übernommen. Stelle den **Parent** Channel also so ein, wie du den Auto Channel haben willst!")

  } else if(args[0].toLowerCase() === `music`) {

    // Help for Music Commands
    help.setAuthor(`Music Commands:`)
    help.setDescription("coming soon...")
    
  } else {
    
  // General Help
  help.setAuthor(`Definiere deine Hilfe:`)
  help.addField(`RPG Commands:`, "`.help rpg`", true)
  help.addField(`Auto Channel:`, "`.help ac`", true)
  help.addField(`Music:`, "`.help music`", true)
  help.addField(`Info:`, "Für eine kleine Info über den Bot führe bitte `.info` aus!")

  }

  help.setFooter(`${botconfig["version"].version} | ${botconfig["version"].date}`)
  help.setColor(botconfig["colors"].rot)
  message.channel.send(help);

}
 
module.exports.help = {
  name: "help"
}