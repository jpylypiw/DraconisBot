/* normal = Draconis | test = TestBot */
let instance = "test";

/* Modules */
const Discord = require("discord.js"); 1
const fs = require("fs");
const moment = require("moment");

/* Data */
const login = require("./data/secret/token.json")
const botconfig = require("./data/settings/botconfig.json");
const userData = require("./data/rpg/userdata.json");

/* Event Files */
let voiceupdatefile = require(`./botupdates/voicestateupdate.js`)
let createdatabasefile = require(`./botupdates/createdatabase.js`)
let presenceupdatefile = require(`./botupdates/presenceupdate.js`)

// Define
const bot = new Discord.Client();
const prefix = botconfig.prefix;

// Deutsch
moment.locale(`de`);

// Set Statuses and Interval Timer Minutes
const activities_list = [
    `.help | auf ${bot.guilds.size} Servern!`,
    `.help | also try .info`, 
    `.help | Autochannel 👍`,
    `Guild Wars 2`,
]
let minutes = 120

/* Bot on Start */
bot.on("ready", async () => {

    // Status & Activity
    bot.user.setStatus("dnd");

    bot.user.setActivity(`.help`, { type: "PLAYING" });

    // Change Status 
    setInterval(() => {
        const index = Math.floor(Math.random() * activities_list.length);
        bot.user.setActivity(activities_list[index], { type: "PLAYING" });
    }, 1000 * 60 * minutes);

    // Log
    console.log(`${bot.user.username} ist bereit auf ${bot.guilds.size} Server(n)!`);
    console.log("https://discordapp.com/oauth2/authorize/?permissions=536014032&scope=bot&client_id=" + bot.user.id)
});

/* Bot when added to Guild */
bot.on("guildCreate", guild => {
    console.log(`Neuem Discord beigetreten: ${guild.name} (ID: ${guild.id}). Der Discord hat ${guild.memberCount} Mitglieder!`);
});

/* Bot when removed from Guild */
bot.on("guildDelete", guild => {
    console.log(`Ich wurde entfernt von: ${guild.name} (ID: ${guild.id})`);
});

/* Command Handler 1 */
bot.commands = new Discord.Collection();
fs.readdir("./commands/", (err, files) => {
    
    // log error
    if (err) console.log(err);

    // let every file with .js in ./commands/ be "jsfile"
    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if (jsfile <= 0) {
        console.log("Commands not found.");
        return;
    }

    // set the commands in the new collection
    jsfile.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        bot.commands.set(props.help.name, props)
    })
});

/* Bot on Message */
bot.on("message", async message => {

    // If Author is Bot ord Type is DM, return
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;

    /* Command Handler 2 */
    if (message.content.startsWith(prefix)) {

        // define args and commands
        const args = message.content.slice(prefix.length).trim().split(` `);
        const cmd = args.shift().toLowerCase();

        // define dcuser as message author if nobody is mentioned 
        var dcuser 
        if(!message.mentions.users.first()) {
            dcuser = message.author
        } else {
            dcuser = message.mentions.users.first()
        }

        // Create DataBase for User
        if(!userData[dcuser.id] || dcuser.tag !== userData[dcuser.id].discordname) {
            createdatabasefile.run(bot, dcuser);
        }

        // get commands and execute it
        let commandfile = bot.commands.get(cmd);
        if (commandfile) commandfile.run(bot, message, args, botconfig, dcuser);
        if (message.content.indexOf(prefix) !== 0) return;
    }
});

/* Bot on Voice State Update */
bot.on('voiceStateUpdate', async (oldMember, newMember) => {
    if (newMember.user.bot || oldMember.user.bot) return;
    voiceupdatefile.run(bot, oldMember, newMember);
});

/* Bot on Presence Update */
bot.on('presenceUpdate', (oldMember, newMember) => {
    if (newMember.user.bot || oldMember.user.bot) return;
    presenceupdatefile.run(bot, oldMember, newMember);
});

/* Bot Login | select instance */
if (instance === "normal") {
    var token = login.token
} else if(instance === "test") {
    var token = login.testToken
}

/* Bot Login | login with selected key */
bot.login(token);