const Discord = require('discord.js');

module.exports = {
    name: 'pause',
    aliases: ['p'],
    description: 'pauses a song/nasheed',

    async execute (client, message, args) {
        if(!message.member.voice.channel)  return message.reply('Pleases be in a vc to use this command.');
        
        await client.distube.pause(message)
        await message.channel.send("**Paused Playing!**") 
    }
}