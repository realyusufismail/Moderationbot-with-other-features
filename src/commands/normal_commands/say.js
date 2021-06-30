module.exports = {
    name: 'say',
    description: 'The bots repeats what you said',
    execute(client, message, args) {
        const text = args.join(" ")
        if(!text) return message.channel.send("You have not specified something to say").then(msg => {
            msg.delete({ timeout: 30000 })
        })
        message.channel.send(text)
    
    },
};