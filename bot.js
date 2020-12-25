require('dotenv').config();
const discord = require('discord.js');
const client = new discord.Client();
const PREFIX = process.env.PREFIX;
client.login(process.env.BOT_TOKEN);
// Set the bot's "Playing: " status (must be in an event!)
client.on("ready", () => {
   client.user.setActivity("Helping people who are typing &help and responding to commands")
})


client.on('ready',() =>{
 console.log(`${client.user.tag} has logged in.`);

});
const isValidCommand = (message, cmdName) => message.content.toLowerCase().startsWith(PREFIX + cmdName);
const rollDice  = () => Math.floor(Math.random() * 6) + 1;
const checkPermissionRole = (role) => role.permissions.has('ADMINISTRATOR') || role.permissions.has('KICK_MEMBERS') || 
role.permissions.has('BAN_MEMBERS') || role.permissions.has("MANAGE_GUILD")|| role.permissions.has('MANAGE_CHANNELS');
client.on('message', async function(message) {
if(message.author.bot)return;
if(isValidCommand(message, "hello"))
    message.reply("hello"); 
 if (isValidCommand(message,"help"))
    message.reply("To kick type &kick. To unban type &unban. To ban a user type &ban. To roll dice type &rolldice. To add a role type &add role name. To remove role type &del role name. You can do more than one in the same time apllies to adding and removing roles. To embed a message type &embed. &say to post announcment. only in the bot owner server. More commands comming soon");
if (isValidCommand(message, "rolldice"))
    message.reply("rolled a " + rollDice());
   
else if(isValidCommand(message, "add")){
   let args = message.content.toLowerCase().substring(5);
   let roleNames = args.split(", ");
   let roleSet = new Set(roleNames);
 let { cache } = message.guild.roles;

   roleSet.forEach(roleName => {
    let role = cache.find(role => role.name.toLowerCase() === roleName);
    if(role){
  if (message.member.roles.cache.has(role.id)){
   message.channel.send("You already have this role!");
   return;   
  }
 
  if(checkPermissionRole(role))   {
  message.channel.send("You cannot add yourself to this role.");
 
  }
  else{
 
     message.member.roles.add(role)
        .then(member => message.channel.send("You were added to this role!"))
        .catch(err => {
         console.log(err)
         message.channel.send("Something went wrong...");
 
        });
  }
 
    }
    else {
      message.channel.send("Role not found!");
 
    }
 
    
   });
   
} 
else if(isValidCommand(message, "del")){
   let args = message.content.toLowerCase().substring(5);
   let roleNames = args.split(", ");
   let roleSet = new Set(roleNames);
 let { cache } = message.guild.roles;
 roleSet.forEach(roleName => {
   let role = cache.find(role => role.name.toLowerCase() === roleName);
   if(role){
 if (message.member.roles.cache.has(role.id)){
   message.member.roles.remove(role)
   .then(member => message.channel.send("You were romoved from this role!"))
   .catch(err => {
    console.log(err)
    message.channel.send("Something went wrong...");

   });
  return;   
 }

   }
   else {
     message.channel.send("Role not found!");

   }

   
  });
  
   
}
else if(isValidCommand(message, "embed")){
  let embedContent = message.content.substring( 7);
  let embed = new discord.MessageEmbed();
  embed.setDescription(embedContent);
  embed.setColor('#00e5ff');
  embed.setTitle("New Embed Message Created");
  embed.setTimestamp();
  embed.setAuthor(message.author.tag);
  embed.setThumbnail(message.author.displayAvatarURL()); 
  message.channel.send(embed);
 
}
else if(isValidCommand(message, "say")){
  let announcement = message.content.substring(5);
  let announcementsChannel = client.channels.cache.get('715580429498974209');
  if(announcementsChannel)
announcementsChannel.send(announcement);

  
  
}
else if(isValidCommand(message, "ban")){
  if(!message.member.hasPermission('BAN_MEMBERS')){
    message.channel.send("You dont have permission to ban people!");

  }
else {
  let memberId = message.content.substring(message.content.indexOf(' ') + 1);
try {
  let bannnedMember = await message.guild.members.ban(memberId);
  if(bannnedMember)
  message.channel.send(bannnedMember.tag + " was banned.");

}
catch(err){
  console.log(err);
}
} 



}
else if(isValidCommand(message, "unban")){
  if(!message.member.hasPermission('BAN_MEMBERS')){
    message.channel.send("You dont have permission to ban people!");

  }
else {
  let memberId = message.content.substring(message.content.indexOf(' ') + 1);
try {
  let unbannnedMember = await message.guild.members.unban(memberId);
  if(unbannnedMember)
  message.channel.send(unbannnedMember.tag + " was unbanned.");

}
catch(err){
  console.log(err);
}
} 



}
else if(isValidCommand(message, "kick")){
  if(!message.member.hasPermission('KICK_MEMBERS')){
    message.channel.send("You dont have permission to ban people!");
}
else {
  let memberId = message.content.substring(message.content.indexOf(' ') + 1);
  let member = message.guild.members.cache.get(memberId);
  if(member){
    try {
    await member.kick();
      message.channel.send("The member was kicked.");
    
    }
    catch(err){
      console.log(err);
    }
  }

} 
}
else if(isValidCommand(message, "mute")){
  if(message.member.hasPermission(['KICK_MEMBERS','BAN_MEMBERS'])){
    message.channel.send("You dont have permission to mute people!");
  }
  else {
    let memberId = message.content.substring(message.content.indexOf(' ')+1);
    let member = message.guild.members.cache.get(memberId);
    if(member){
      if(member.hasPermission(['KICK_MEMBERS'])&& !message.member.hasPermission('ADMINISTRATOR')){
       message.channel.send("You dont have permission to mute this person. Nice try!! :laughing:")
      }
      else{
        let mutedrole = message.guild.roles.cache.get('722004435764772904');
        if (mutedrole){
          member.roles.add(mutedrole);
          message.send.channel("The user was muted")
        }
        else{
        message.channel.send("Muted role not found.");

        }
       
      }
    }
    else{
       message.channel.send("Member does not exist");

    }
  }
  
}
else if(isValidCommand(message,"unmute")){
  if(message.member.hasPermission(['KICK_MEMBERS'])){
    message.channel.send("You dont have permission to unmute people!");
  }
  else {
    let memberId = message.content.substring(message.content.indexOf(' ')+1);
    let member = message.guild.members.cache.get(memberId);
    if(member){
      if(member.hasPermission(['KICK_MEMBERS','BAN_MEMBERS'])&& !message.member.hasPermission('ADMINISTRATOR')){
       message.channel.send("You dont have permission to unmute this person. Nice try!! :laughing:")
      }
      else{
        let mutedrole = message.guild.roles.cache.get('722004435764772904');
        if (mutedrole){
          member.roles.remove(mutedrole);
          message.send.channel("The user was unmuted")
        }
        else{
        message.channel.send("Muted role not found.");

        }
       
      }
    }
    else{
       message.channel.send("Member does not exist");

    }
  }
  
  else if(isValidCommand(message,"Invitelink")){
     f(message.member.hasPermission(['CREATE_INSTANT_INVITE'])){
    message.channel.send("You dont have permission to unmute people!");
  }
     let invite = await message.channel.createInvite(
  {
    maxAge: 10 * 60 * 1000, // maximum time for the invite, in milliseconds
    maxUses: 1 // maximum times it can be used
  },
  `Requested with command by ${message.author.tag}`
)
.catch(console.log);

  message.reply(invite ? `Here's your invite: ${invite}` : "There has been an error during the creation of the invite.");
}
}
});
 
    
//npm install -g nodemon
//nodemon bot.js
