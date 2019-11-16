const discord = require("discord.js");
const botConfig = require("./botConfig.json");

const bot = new discord.Client();




bot.on("ready", async () => {

   console.log(`${bot.user.username} is nu online!`)


   bot.user.setActivity("me getting developed", {type: "WATCHING"});

});


bot.on("message", async message => {

  if  (message.author.bot) return;

  if  (message.channel.type === "dm") return; 

  var prefix = botConfig.prefix;

  var messageArray = message.content.split(" ");  

  var command = messageArray[0]; 

  var arguments = messageArray.slice(1);

   if( command ===  `${prefix}founder`){

     return message.channel.send("The founder of this server is **elit3 Dave#6926**!");


	 }



	 
	   if( command ===  `${prefix}botinfo`) {

	 
	 var botIcon = bot.user.displayAvatarURL;
	 
	 
	 var botEmbed = new discord.RichEmbed()
	 .setDescription("Discord Bot Info:")
	 .setColor("#44ffa8")
	 .setThumbnail(botIcon)
	 .addField ("Published date:", bot.user.createdAt)
	 .addField("Bot name:", bot.user.username);
	 


	 return message.channel.send(botEmbed);



	 }

	  if (command ===  `${prefix}serverinfo`) {

	  var icon = message.guild.iconURL;

 var serverEmbed = new discord.RichEmbed()
	 .setDescription("Server Info:")
	 .setColor("#44ffa8")
	 .setThumbnail(icon)
	 .addField ("Default bot name:", bot.user.username)
	 .addField("You joined at:", message.member.joinedAt)
	 .addField("Members in total:", message.guild.memberCount);
	 

	 return message.channel.send(serverEmbed);

            }
 
   if (command ===  `${prefix}kick`){

   // !kick user reden 

  var kickUser = message.guild.member(message.mentions.users.first()  || message.guild.members(arguments[0]));

  if(!kickUser) return message.channel.send("Sorry, user not found!");

  var reason = arguments.join(" ").slice(22);

  if  (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Sorry, insufficient permissions.");

  if  (kickUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Sorry, this person can not be kicked.");
  
  var kick = new discord.RichEmbed()
  .setDescription("Kick")
  .setColor("#44ffa8")
  .addField("Kicked user:", kickUser) 
  .addField("Kicked by:", message.author)
  .addField("Reason:", reason);

  var kickChannel = message.guild.channels.find(`name`, "smites");
  if(!kickChannel) return message.guild.send("Can not find channel!");
  
  message.guild.member(kickUser).kick(reason);

  kickChannel.send(kick);
  
  

  return;


  }

  //!ban user reden

  if (command ===  `${prefix}ban`) {


    var banUser = message.guild.member(message.mentions.users.first()  || message.guild.members(arguments[0]));

  if(!banUser) return message.channel.send("Sorry, user not found!");

  var reason = arguments.join(" ").slice(22);

  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Sorry, insufficient permissions.");

  if(banUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Sorry, this person can not be banned.");
  
  var ban = new discord.RichEmbed()
     .setDescription("Ban")
     .setColor("#44ffa8")
     .addField("Banned user:", banUser) 
     .addField("Banned by:", message.author)
     .addField("Reason:", reason);
  
  
  
  var banChannel = message.guild.channels.find(`name`, "smites");
  if  (!banChannel) return message.guild.send("Can not find channel!");
  
  message.guild.member(banUser).ban(reason);

  banChannel.send(ban);
  
     return;











  }


});
  










bot.login(process.env.token);