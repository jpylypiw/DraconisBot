const Discord = require("discord.js");
const fs = require("fs");
// require
let tempChannel = require("../../data/cache/tempchannel.json");

module.exports.run = async (bot, oldMember, newMember, executable) => {

if(executable === "yes") {

let channel = newMember.voiceChannel

if (newMember.presence.game === null) {
    var gamename = "No Game"
} else {
    var gamename = newMember.presence.game.name
}

channel.clone("- " + gamename, true)
    .then(createdChannel => {
        createdChannel.setParent(channel.parentID)
        createdChannel.edit({
            bitrate: channel.bitrate * 1000,
            userLimit: channel.userLimit,
            position: channel.position,
            Permissions: channel.Permissions
        })
    newMember.setVoiceChannel(createdChannel)

    if(!tempChannel[createdChannel.id]) tempChannel[createdChannel.id] = {}
    if(!tempChannel[createdChannel.id].owner) tempChannel[createdChannel.id].owner = newMember.user.id
    
    fs.writeFile("./data/cache/tempchannel.json", JSON.stringify(tempChannel, null, 4), (err) => {
        if(err) console.log(err)
    });

    })

} else {

    if(tempChannel[oldMember.voiceChannel.id].owner === newMember.id) {
        delete tempChannel[oldMember.voiceChannel.id]

    fs.writeFile("./data/cache/tempchannel.json", JSON.stringify(tempChannel, null, 4), (err) => {
        if(err) console.log(err)
    });
    } else { 
        return;
    }
}

}

module.exports.help = {
    name: "withgame"
}