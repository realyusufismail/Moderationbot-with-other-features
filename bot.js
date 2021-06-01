const Discord = require("discord.js");
const config = require("./config.json");

const client = new Discord.Client();

client.on("ready", () => {
    client.user.setActivity("Replying to people who type &help")
    client.user.setPresence({
        status: "online",  // You can show online, idle... Do not disturb is dnd
      })
  })

  

  
  
  client.on('ready',() =>{
   console.log(`${client.user.tag} has logged in.`);
  
  });

const prefix = "&";

client.on("message", function(message) {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  

  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(' ');
  const command = args.shift().toLowerCase();

  
  if (command === "ping") {
    const timeTaken = Date.now() - message.createdTimestamp;
    message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
  }

  else if (command === "sum") {
    const numArgs = args.map(x => parseFloat(x));
    const sum = numArgs.reduce((counter, x) => counter += x);
    message.reply(`The sum of all the arguments you provided is ${sum}!`);
  }
  
  if (command === "kick") {
    if (!message.member.hasPermission('KICK_MEMBERS'))
        return message.channel.send("Insufficient permissions (Requires permission `Kick members`)").then(msg => {
    msg.delete({ timeout: 30000 })
})
    const member = message.mentions.members.first();
    if (!member)
        return message.channel.send("You have not mentioned a user").then(msg => {
    msg.delete({ timeout: 30000 })
})
    if (!member.kickable)
        return message.channel.send("This user is unkickable").then(msg => {
    msg.delete({ timeout: 30000 })
})
    const reason = args.slice(1).join(" ")
    if (member) {
        if (!reason) return member.kick().then(member => {
            message.channel.send(`${member.user.tag} was kicked, no reason was provided`);
        })

        if (reason) return member.kick().then(member => {
            message.channel.send(`${member.user.tag} was kicked for ${reason}`);
        })
    }
}

if (command === "ban") {
    if (!message.member.hasPermission('BAN_MEMBERS'))
        return message.channel.send("Insufficient permissions (Requires permission `Ban members`)").then(msg => {
    msg.delete({ timeout: 30000 })
})
    const member = message.mentions.members.first();
    if (!member)
        return message.channel.send("You have not mentioned a user").then(msg => {
    msg.delete({ timeout: 30000 })
})
    if (!member.bannable)
        return message.channel.send("This user is unbannable").then(msg => {
    msg.delete({ timeout: 30000 })
})
    const reason = args.slice(1).join(" ")
    if (member) {
        if (!reason) return member.ban().then(member => {
            message.channel.send(`${member.user.tag} was banned, no reason was provided`);
        })

        if (reason) return member.ban(reason).then(member => {
            message.channel.send(`${member.user.tag} was banned for ${reason}`);
        })
    }
}
if (command === "say") {
    const text = args.join(" ")
    if(!text) return message.channel.send("You have not specified something to say").then(msg => {
        msg.delete({ timeout: 30000 })
    })
    message.channel.send(text)
    
    }
    if (command === "help") {
        message.reply("Comming soon") ; 
    }
    
    if (command === "add") {
        if (!message.member.hasPermission('MANAGE_ROLES'))
            return message.channel.send("Insufficient permissions (Requires permission `Manage roles`)").then(msg => {
        msg.delete({ timeout: 30000 })
    })
        const member = message.mentions.members.first()
        if (!member)
            return message.channel.send("You have not mentioned a user").then(msg => {
        msg.delete({ timeout: 30000 })
    })
        const add = args.slice(1).join(" ")
        if (!add)
            return message.channel.send("You have not specified a role").then(msg => {
        msg.delete({ timeout: 30000 })
    })
        const roleAdd = message.guild.roles.cache.find(role => role.name === add)
        if (!roleAdd)
            return message.channel.send("This role does not exist").then(msg => {
        msg.delete({ timeout: 30000 })
    })
        if (member.roles.cache.get(roleAdd.id))
            return message.channel.send(`This user already has the ${add} role`).then(msg => {
        msg.delete({ timeout: 30000 })
    })
        member.roles.add(roleAdd.id).then((member) => {
            message.channel.send(`${add} added to ${member.displayName}`)
        })
    }

    if (command === "remove") {
        if (!message.member.hasPermission('MANAGE_ROLES'))
            return message.channel.send("Insufficient permissions (Requires permission `Manage roles`)").then(msg => {
        msg.delete({ timeout: 30000 })
    })
        const member = message.mentions.members.first()
        if (!member)
            return message.channel.send("You have not mentioned a user").then(msg => {
        msg.delete({ timeout: 30000 })
    })
        const remove = args.slice(1).join(" ")
        if (!remove)
            return message.channel.send("You have not specified a role").then(msg => {
        msg.delete({ timeout: 30000 })
    })
        const roleRemove = message.guild.roles.cache.find(role => role.name === remove)
        if (!roleRemove)
            return message.channel.send("This role does not exist").then(msg => {
        msg.delete({ timeout: 30000 })
    })
        if (!member.roles.cache.get(roleRemove.id))
            return message.channel.send(`This user does not have the ${remove} role`).then(msg => {
        msg.delete({ timeout: 30000 })
    })
        member.roles.remove(roleRemove.id).then((member) => {
            message.channel.send(`${remove} removed from ${member.displayName}`)
        })
    }
else {
    message.reply("Command not found") ; 
    }



});

client.on('message', async message => {
    antiSwearWords(client, message, {
        warnMSG: `<@${message.author.id}> , why are you writing this?`, 
        // warn message option || when not then = `<@${message.author.id}> dont use swear words.` 
        // Behind the warnMSG will be an Warn Count
        ignoreWord: ["ignoreThis", "andIgnoreThis", "alsoIgnoreThis"],
        customWord: ["aCustomWord", "anOtherCustomWord"],
        muteRole: "842342069494349865",  // ID of the Role
        muteCount: 10,        // Number when the user get muted
        kickCount: 20,        // Number when the user get kicked
        banCount: 30,         // Number when the user get banned
    });                       
});

client.login(config.BOT_TOKEN);