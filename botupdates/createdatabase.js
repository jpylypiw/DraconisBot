const Discord = require("discord.js");
const fs = require("fs");

// require
const userData = require("../data/rpg/userdata.json");

module.exports.run = async (bot, dcuser) => {

    // id of dcuser
    let dcusid = dcuser.id

// basic character data
if(!userData[dcusid]) userData[dcusid] = {}
if(!userData[dcusid].discordname) userData[dcusid].discordname = dcuser.tag
if(!userData[dcusid].loreCoins) userData[dcusid].loreCoins = 0
if(!userData[dcusid].class) userData[dcusid].class = "none"

// update discordname in json
if(dcuser.tag !== userData[dcusid].discordname) userData[dcusid].discordname = dcuser.tag

// Write File - RPG
fs.writeFile("./data/rpg/userdata.json", JSON.stringify(userData, null, 4), (err) => {
    if(err) console.log(err)
});

}

module.exports.help = {
    name: "createdatabase"
}