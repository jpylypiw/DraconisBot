const Discord = require("discord.js");
const fs = require("fs");
// require
const botconfig = require("../data/settings/botconfig.json");
const userData = require("../data/rpg/userdata.json");

// auto channel
const usernameautochannelfile = require(`./autochannel/withusername.js`);
const gameautochannelfile = require(`./autochannel/withgame.js`);

module.exports.run = async (bot, oldMember, newMember) => {

let newUserChannel = newMember.voiceChannel
let oldUserChannel = oldMember.voiceChannel

if(oldMember.presence.game === null) {
    var gamename = "No Game"
} else {
    var gamename = oldMember.presence.game.name
}

// let channel = bot.channels.find(x => x.name.startsWith(`🎮`));

// If Member mutes himself | unmuted before & muted after
    if(oldMember.mute === false && newMember.mute === true) return;
    if(oldMember.mute === true && newMember.mute === false) return; 
// If Member joins VC | From undefined in defined Channel
    if(oldUserChannel === undefined && newUserChannel !== undefined) {    

        let executable = "yes";
        if (newUserChannel.name.startsWith(`🎮`)) gameautochannelfile.run(bot, oldMember, newMember, executable);
        if (newUserChannel.name.startsWith(`👥`)) usernameautochannelfile.run(bot, oldMember, newMember);

// If Member switches VC | From defined in defined Channel 
    } else if(oldUserChannel !== undefined && newUserChannel !== undefined) {     

        if(oldUserChannel.name.startsWith("- ")) {
            if(oldUserChannel.name.startsWith("- " + gamename)) {
                let executable = "no"; 
                gameautochannelfile.run(bot, oldMember, newMember, executable);   
            }
            if(oldUserChannel.members.size === 0) oldUserChannel.delete();
        }

        let executable = "yes";
        if (newUserChannel.name.startsWith(`🎮`)) gameautochannelfile.run(bot, oldMember, newMember, executable);
        if (newUserChannel.name.startsWith(`👥`)) usernameautochannelfile.run(bot, oldMember, newMember);

// If Member leaves VC | From defined in undefined Channel
    } else if(oldUserChannel !== undefined && newUserChannel === undefined) {  

        if(oldUserChannel.name.startsWith("- ")) {
            if(oldUserChannel.name.startsWith("- " + gamename)) {
                let executable = "no"; 
                gameautochannelfile.run(bot, oldMember, newMember, executable);  
            }
            if(oldUserChannel.members.size === 0) oldUserChannel.delete();
        }
    }

}

module.exports.help = {
    name: "voicestateupdate"
}