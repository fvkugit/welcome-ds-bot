const Discord = require("discord.js"),
      Canvas = require("canvas"),
      {
       TOKEN,
       WelcomeChannel,
       WelcomeMessage,
       WelcomeMessage2,
       AutoRole,
       AutoRoleName,
       SetStatus,
       DM,
       //DMMessage
      } = require("./config.json"),
      client = new Discord.Client({ disableEveryone: true });



// Connect to Discord API
client.login(TOKEN).catch(console.error);


/**
 * Client Events
 */
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity(SetStatus, { type: 'WATCHING' });
  

 // client.user.setStatus("idle"); // YOU CAN CHOUSE: online, idle, invisible, dnd (do not disturb)
});

client.on("warn", warn => console.log(warn))
.on("error", error => console.error(error));

/*         */
module.exports = async (client) => {
  console.log("reactionRole: ready");

  client.reactionRoleRules = {};
  for (const rule of rules) {
    client.reactionRoleRules[rule.messageId] = rule;
    const channel = await client.channels.fetch(rule.channelId);
    const message = await channel.messages.fetch(rule.messageId);
    Object.keys(rule.emojiRoleMap).forEach(
      async (emoji) => await message.react(emoji)
    );
  }
};

client.on("guildMemberAdd", async (member) => {
  const channel = member.guild.channels.cache.find(ch => ch.name === WelcomeChannel);
  //const channel2 = member.guild.channels.cache.find(ch => ch.name === "📜-»-reglas");
  //channel2.send(WelcomeMessage2)
  if (!channel) return;
  var f = new Date();
  date = (f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear());
  let role = member.guild.roles.cache.find(role => role.name == AutoRoleName);
  let background = await Canvas.loadImage("https://i.imgur.com/pNFJq8K.png");
  let avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: "png" }));
  let canvas = Canvas.createCanvas(841, 510);
  let ctx = canvas.getContext("2d");
  ctx.patternQuality = "bilinear";
  ctx.filter = "bilinear";
  ctx.antialias = "subpixel";
  ctx.shadowColor = "rgba(0, 0, 0, 0.4)";
  ctx.shadowOffsetY = 2;
  ctx.shadowBlur = 2;
  ctx.stroke();
  ctx.beginPath();
  ctx.drawImage(background, 0, 0, 841, 510);
  ctx.font = "bold 30px Verdana";
  ctx.fontSize = "72px";
  ctx.fillStyle = "#000000";
  ctx.textAlign = "left";
  ctx.fillText(member.user.username, 400, 200);
  ctx.font = "bold 30px Verdana";
  ctx.fontSize = "72px";
  ctx.fillStyle = "#000000";
  ctx.textAlign = "left";
  ctx.fillText((member.user.tag).slice(-4), 400, 300);
  ctx.font = "bold 16px Verdana";
  ctx.fontSize = "72px";
  ctx.fillStyle = "#000000";
  ctx.textAlign = "left";
  ctx.fillText(`${member.user.id}${member.guild.memberCount}`, 56, 465);
  ctx.font = "bold 30px Verdana";
  ctx.fontSize = "72px";
  ctx.fillStyle = "#000000";
  ctx.textAlign = "left";
  ctx.fillText(date, 400, 400);
  ctx.font = "bold 30px Verdana";
  ctx.fontSize = "72px";
  ctx.fillStyle = "#000000";
  ctx.textAlign = "left";
  ctx.fillText("Indefinido", 580, 300);
  //ctx.beginPath();
  //ctx.arc(169.5, 148, 126.9, -100, Math.PI * 2, true);
  //ctx.closePath();
  //ctx.clip();
  ctx.drawImage(avatar, 59, 110, 312, 312);
  var welcomeMsg = WelcomeMessage.replace("[[user]]", member.user).replace("[[server]]", member.guild.name).replace("[[members]]",member.guild.memberCount);
  let file = new Discord.MessageAttachment(canvas.toBuffer(), "bienvenido.png");
 
setTimeout(() => channel.send(welcomeMsg, file), 1024);

if(AutoRole){
if (!role)return console.log("Couldn't find that role");
else member.roles.add(role);    
}
if(DM){
member.send(welcomeMsg, file);    
}
});

