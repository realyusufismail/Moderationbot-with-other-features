module.exports = {
    name: 'music help',
    description: 'All music commands in this bot',
    execute(client, message, args) {
        message.reply("Commands List\n1. play\n2. queue\n3. leave\n4. skip\n5. pause\n5. kick\n6. loop") ;
    },
};
