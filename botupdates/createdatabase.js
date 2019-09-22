const Discord = require("discord.js");
const fs = require("fs");
// require
const userData = require("../data/rpg/userdata.json");

module.exports.run = async (bot, message) => {

let player = message.author.id;

// basic character data
if(!userData[player]) userData[player] = {}
if(!userData[player].discordname) userData[player].discordname = message.member.user.tag
if(!userData[player].loreCoins) userData[player].loreCoins = 0
if(!userData[player].class) userData[player].class = "none"

// update discordname in json
bot.fetchUser(player).then(fetchplayer => {
    if(fetchplayer.tag !== userData[player].discordname) userData[player].discordname = message.member.user.tag
})

// Write File - RPG
fs.writeFile("./data/rpg/userdata.json", JSON.stringify(userData, null, 4), (err) => {
    if(err) console.log(err)
});

}

module.exports.help = {
    name: "createdatabase"
}