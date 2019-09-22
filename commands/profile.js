/* Modules */
const Discord = require("discord.js");
const Canvas = require("canvas");
const fetch = require("node-fetch");
const fs = require("fs");

/* Data */
const userData = require("../data/rpg/userdata.json");

/* Define */
const imageUrlRegex = /\?size=2048$/g;

module.exports.run = async (bot, message, args, botconfig, dcuser) => {

  const canvas = Canvas.createCanvas(400, 180);
	const ctx = canvas.getContext('2d');

  let color1 = "#8756e6";
  let color2 = "#7289DA";
  
  var grd = ctx.createLinearGradient(0, 0, 280, 0);
  grd.addColorStop(0, color1);
  grd.addColorStop(1, color2);
  
  ctx.fillStyle = grd;
  ctx.fillRect(84, 0, 316, 180);

  // // make a Background
  // ctx.fillStyle = "#7289DA";
  // ctx.fillRect(84, 0, 316, 180);

  // make Rects
  ctx.fillStyle = "#2C2F33";
  ctx.fillRect(0, 0, 84, 180);
  ctx.fillRect(169, 26, 231, 46);
  ctx.fillRect(224, 108, 176, 46);

  // Get Avatar of User
  const avatar = await Canvas.loadImage(dcuser.avatarURL);

  // Make Circle with Shadow
  ctx.shadowColor = "#161616"; 
  ctx.shadowOffsetY = 5; 
  ctx.shadowBlur = 10; 

  ctx.save();
  ctx.beginPath();
  ctx.fillStyle = "#2C2F33";
  ctx.arc(84, 90, 62, 0, 2 * Math.PI);
  ctx.fill();
  ctx.closePath();
  ctx.clip();

  ctx.drawImage(avatar, 22, 28, 62*2, 62*2);

  ctx.beginPath();
  ctx.arc(0, 0, 25, 0, Math.PI * 2, true);
  ctx.clip();
  ctx.closePath();
  ctx.restore();

  /* Text */
  
  // username and level
	ctx.font = 'bolder normal 14px Verdana';
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = "center";
  ctx.fillText(`${dcuser.username}`, 285, 54);
  ctx.textAlign = "left";
	ctx.fillText(`Money: ${userData[dcuser.id].loreCoins}`, 241, 136);

	// ctx.beginPath();
	// ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
	// ctx.closePath();
	// ctx.clip();

	// const avatar = await Canvas.loadImage(dcuser.avatarURL);
	// ctx.drawImage(avatar, 25, 25, 200, 200);

	const attachment = new Discord.Attachment(canvas.toBuffer(), `${dcuser.id}-profile-image.jpg`);

  message.channel.send(attachment)

}

module.exports.help = {
  name: "profile"
}