/* Modules */
const Discord = require("discord.js");
const fs = require("fs");

/* Data */
const petsfile = require("../data/rpg/pets.json");

/* Define */

module.exports.run = async (bot, message, args, botconfig, dcuser) => {

// Create Pet Database
if(!petsfile["pets"]) {
    petsfile["pets"] = {}
    petsfile["pets"]["level1-5"] = {}
    petsfile["pets"]["level6-10"] = {}
    petsfile["pets"]["level11-15"] = {}
    petsfile["pets"]["level16-20"] = {}
    
    petsfile["pets"]["level1-5"].names = "&Gram&Tsuchigumo&Eulenbär&Werwolf&Amphisbaena"
    petsfile["pets"]["level6-10"].names = "&Kato&Genbu&Hi Nezumi&Isonade&DaibaWashi&Gyokuto"
    petsfile["pets"]["level11-15"].names = "&Kerberos&Ungoliant&Greif&Fafnir&Pegasus&Enko&Karajishi&Seinaru Shika"
    petsfile["pets"]["level16-20"].names = "&Carcharoth&Wyvern/Drache&Einhorn&Yatagarasu&Tengen Kujaku"
};

    // Create Embed
    let petembed = new Discord.RichEmbed()

    if(args[0] === undefined) {
        petembed.setAuthor("Please specify your action:")
        petembed.setDescription("`.pet list`\n`.pet show`")
    } else if(args[0].toLowerCase() === `list`) {
    
    // Pet list
    let data1 = JSON.stringify(petsfile["pets"]["level1-5"])
    let data2 = JSON.stringify(petsfile["pets"]["level6-10"])
    let data3 = JSON.stringify(petsfile["pets"]["level11-15"])
    let data4 = JSON.stringify(petsfile["pets"]["level16-20"])

    let msg1 = data1.substring(10, data1.length - 3).replace(/&/g, "\n- ")
    let msg2 = data2.substring(10, data2.length - 3).replace(/&/g, "\n- ")
    let msg3 = data3.substring(10, data3.length - 3).replace(/&/g, "\n- ")
    let msg4 = data4.substring(10, data4.length - 3).replace(/&/g, "\n- ")
    
    petembed.setAuthor("Die Pets:")
    petembed.addField("Level 1 - 5:", msg1)
    petembed.addField("Level 6 - 10:", msg2)
    petembed.addField("Level 11 - 15:", msg3)
    petembed.addField("Level 16 - 20:", msg4)
    
    } else {
        petembed.setAuthor("Please specify your action:")
        petembed.setDescription("`.pet list`\n`.pet show`")
    }
    
    petembed.setFooter(`${botconfig["version"].version} | ${botconfig["version"].date}`)
    petembed.setColor(botconfig["colors"].dunkelblau)
    message.channel.send(petembed)

    fs.writeFile("./data/rpg/pets.json", JSON.stringify(petsfile, null, 4), (err) => {
        if(err) console.log(err)
    });

}
 
module.exports.help = {
  name: "pet"
}