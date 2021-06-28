const { CommandoClient } = require('discord.js-commando');
const fs = require('fs');
const Discord = require("discord.js");
const { Structures } = require('discord.js');
const { prefix, token } = require('./config.json');
const db = require('quick.db');


const client = new Discord.Client();
client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();


const commandFolders = fs.readdirSync('./src/commands');

for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./src/commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./src/commands/${folder}/${file}`);
		client.commands.set(command.name, command);
    }

}


Structures.extend('Guild', Guild => {
  class MusicGuild extends Guild {
    constructor(client, data) {
      super(client, data);
      this.musicData = {
        queue: [],
        isPlaying: false,
        nowPlaying: null,
        skipTimer: false, // only skip if user used leave command
        loopSong: false,
        volume: 1
      };
    }
  }
  return MusicGuild;
});
 

client.once('ready', () => {
    console.log('bot is online');
    const Guilds = client.guilds.cache.map(guild => guild.name);
    console.log(Guilds, 'Connected!');


client.user.setPresence({
    status: 'available',
    activity: {
        name: 'Answering &help',
        type: 'WATCHING',
        url: 'https://www.youtube.com/channel/UC1RUkzjpWtp4w3OoMKh7pGg'
    }
});
});

client.on('message', message => {
        if (!message.content.startsWith(prefix) || message.author.bot) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        const command = client.commands.get(commandName)
            || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

        if (!command) return;

        if (command.guildOnly && message.channel.type === 'dm') {
            return message.reply('I can\'t execute that command inside DMs!');
        }

        if (command.permissions) {
            const authorPerms = message.channel.permissionsFor(message.author);
            if (!authorPerms || !authorPerms.has(command.permissions)) {
                return message.reply('You can not do this!');
            }
        }
        try {
            command.execute(message, args);
        } catch (error) {
            console.error(error);
            message.reply('there was an error trying to execute that command!');
        }
    });


client.login(token);
