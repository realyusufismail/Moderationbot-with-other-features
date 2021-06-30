const Discord = require('discord.js');

module.exports = {
    name: "loop",
    aliases: ['l', 'repeat', 'r'],
    description: "loops throught current song",


    async execute (client, message, args) {
        if(!message.member.voice.channel) return message.reply('Please join a voice channel!');

        await bot.distube.setRepeatMode(message, parseInt(args[0]));
        await message.channel.send("Looping through current song!");
    }
}
