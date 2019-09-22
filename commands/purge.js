/* Modules */
const Discord = require("discord.js");

/* Data */

/* Define */

module.exports.run = async (bot, message, args, botconfig) => {

    if(!message.member.guild.me.hasPermission('ADMINISTRATOR')) {
        message.channel.send("**I dont have the Permission to do that!** `[ADMINISTRATOR]`").then(msg => msg.delete(4000));
    } else if(!message.member.hasPermission('MANAGE_MESSAGES')) {
        message.channel.send("**You dont have the Permission to do that!**").then(msg => msg.delete(4000));
    } else if(isNaN(args[0])) {
            message.channel.send(`**Please supply a number!**`).then(msg => msg.delete(4000));
        } else if(args[0] >= 100) {
            message.channel.send(`**Please supply a number thats less than 100!**`).then(msg => msg.delete(4000));
        } else {
        let plus = parseInt(args[0], 10) + 1
        message.channel.bulkDelete(plus, true).then(() => {
        message.channel.send("**Messages successfully deleted!**").then(msg => msg.delete(4000));
        })
    }
}
 
module.exports.help = {
  name: "purge"
}