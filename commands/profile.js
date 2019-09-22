/* Modules */
const Discord = require("discord.js");
const fetch = require("node-fetch");
const Canvas = require("canvas-constructor");

/* Data */
const userData = require("../data/rpg/userdata.json");

/* Define */
const imageUrlRegex = /\?size=2048$/g;
const level = 5;

module.exports.run = async (bot, message, args, botconfig) => {

  const buffer = await profile(message.member);
  const filename = `profile-${message.author.id}.jpg`;
  const attachment = new Discord.Attachment(buffer, filename);
  await message.channel.send(attachment);

  async function profile() {
    // We only need the level, and points values, we don't need the user or guild id.
    let level = userData[message.author.id].discordname
    let points = userData[message.author.id].loreCoins
    // We're grabbing the body out of snekfetch's get method, but at the same time we're assigning a variable
    // to it, avatar.
    // Remember when I mentioned the regex before? Now we get to use it, we want to set the size to 128 pixels,
    // instead of 2048 pixels.
    try {
      const result = await fetch(member.user.displayAvatarURL.replace(imageUrlRegex, "?size=128"));
      if (!result.ok) throw new Error("Failed to get the avatar.");
      const avatar = await result.buffer();

      // The reason for the displayName length check, is we don't want the name of the user going outside
      // the box we're going to be making later, so we grab all the characters from the 0 index through
      // to the 17th index and cut the rest off, then append `...`.
      const name = member.displayName.length > 20 ? member.displayName.substring(0, 17) + "..." : member.displayName;

      // ...
    } catch (error) {
      await message.channel.send(`Something happened: ${error.message}`);
    }
  }

}

module.exports.help = {
  name: "profile"
}