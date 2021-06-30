module.exports = {
    name: 'ping',
    description: 'The bots respond speed!',
    execute(client, message, args) {
        const timeTaken = Date.now() - message.createdTimestamp;
        message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
    },
};