const Discord = require('discord.js');

module.exports = {
    name: 'leave',
    aliases: ['l', 'stop'],
    description: 'stops a song/nasheed',

    async execute (client, message, args) {
        if(!message.member.voice.channel)  return message.reply('Pleases be in a vc to use this command.');
        
        await client.distube.stop(message)
        await message.channel.send("**Left channel**") 
    }
}