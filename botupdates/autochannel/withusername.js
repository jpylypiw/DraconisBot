const Discord = require("discord.js");

module.exports.run = async (bot, oldMember, newMember) => {

let channel = newMember.voiceChannel
channel.clone("- " + newMember.user.username, true)
    .then(createdChannel => {
        createdChannel.setParent(channel.parentID)
        createdChannel.edit({
            bitrate: channel.bitrate * 1000,
            userLimit: channel.userLimit,
            position: channel.position,
            Permissions: channel.Permissions
        })
    newMember.setVoiceChannel(createdChannel)
    });
    
}

module.exports.help = {
    name: "withusername"
}