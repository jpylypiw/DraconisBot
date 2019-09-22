const Discord = require("discord.js");
const fs = require("fs");

// require
let tempChannel = require("../data/cache/tempchannel.json");

module.exports.run = async (bot, oldMember, newMember) => {

    if (oldMember.presence.game === null && newMember.presence.game !== null) {
        
        if(owner == undefined) return;

        // if member starts playing
        if (!newMember.voiceChannel) return;

        if (newMember.voiceChannel.name.startsWith("- " + "No Game")) {
            if (newMember.user.id === tempChannel[newMember.voiceChannel.id].owner) newMember.voiceChannel.setName("- " + newMember.presence.game.name)
        }
    } else if (oldMember.presence.game !== null && newMember.presence.game === null) {
        
        if(owner == undefined) return;

        // if member stops playing
        if (!newMember.voiceChannel) return;

        if (newMember.voiceChannel.name.startsWith("- " + oldMember.presence.game.name)) {
            if (newMember.user.id === tempChannel[newMember.voiceChannel.id].owner) newMember.voiceChannel.setName("- " + "No Game")
        }
    }
}

module.exports.help = {
    name: "presenceupdate"
}