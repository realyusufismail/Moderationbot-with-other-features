module.exports = {
    name: 'music_help',
    description: 'All commands in this bot for music',
    execute(message, args) {
        message.reply("Commands List\n1. play\n2. lyrics\n3. join\n4. leave.") ;
    },
};