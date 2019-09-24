/* Modules */
const Discord = require("discord.js");
const fs = require("fs");

/* Data */

// require
const usernameautochannelfile = require(`./autochannel/withusername.js`);
const gameautochannelfile = require(`./autochannel/withgame.js`);

module.exports.run = async (bot, oldMember, newMember) => {

    let newUserChannel = newMember.voiceChannel
    let oldUserChannel = oldMember.voiceChannel

    if (oldMember.presence.game == null) {
        var gamename = "No Game"
    } else {
        var gamename = oldMember.presence.game.name
    }

    // If Member mutes himself | unmuted before & muted after
    // if (oldMember.mute == false && newMember.mute == true) return;
    // if (oldMember.mute == true && newMember.mute == false) return;

    // If Member joins VC | From undefined in defined Channel
    if (oldMember.mute == false && newMember.mute == true && oldUserChannel == undefined && newUserChannel != undefined || oldMember.mute == true && newMember.mute == false && oldUserChannel == undefined && newUserChannel != undefined || oldUserChannel == undefined && newUserChannel != undefined) {

        console.log(oldMember.mute, newMember.mute)

        let executable = "yes";
        if (newUserChannel.name.startsWith(`🎮`)) gameautochannelfile.run(bot, oldMember, newMember, executable);
        if (newUserChannel.name.startsWith(`👥`)) usernameautochannelfile.run(bot, oldMember, newMember);

        // If Member switches VC | From defined in defined Channel 
    } else if (oldUserChannel != undefined && newUserChannel != undefined) {

        if (oldUserChannel.name.startsWith("- ")) {
            if (oldUserChannel.name.startsWith("- " + gamename)) {
                let executable = "no";
                gameautochannelfile.run(bot, oldMember, newMember, executable);
            }
            if (oldUserChannel.members.size == 0) oldUserChannel.delete();
        }

        let executable = "yes";
        if (newUserChannel.name.startsWith(`🎮`)) gameautochannelfile.run(bot, oldMember, newMember, executable);
        if (newUserChannel.name.startsWith(`👥`)) usernameautochannelfile.run(bot, oldMember, newMember);

        // If Member leaves VC | From defined in undefined Channel
    } else if (oldUserChannel != undefined && newUserChannel == undefined) {

        if (oldUserChannel.name.startsWith("- ")) {
            if (oldUserChannel.name.startsWith("- " + gamename)) {
                let executable = "no";
                gameautochannelfile.run(bot, oldMember, newMember, executable);
            }
            if (oldUserChannel.members.size == 0) oldUserChannel.delete();
        }
    }

}

module.exports.help = {
    name: "voicestateupdate"
}