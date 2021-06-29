const Discord = require('discord.js');

module.exports = {
    name: "play",
    aliases: ['p'],
    description: "play a song!",

    async execute (client, message, args) {
        if(!message.member.voice.channel) return message.reply('Please join a voice channel!');

        const music = args.join(" "); //.play <args (song name)>
        if(!music) return message.reply("Please provide a song!");

        await client.distube.play(message, music)
    }
}