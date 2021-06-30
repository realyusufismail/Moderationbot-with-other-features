module.exports = {
    name: 'warn',
    description: 'Warn a user',
    execute(client, message, args) {
        if (!message.member.hasPermission('ADMINISTRATOR'))
        return message.channel.send("Insufficient permissions (Requires permission `Kick members`)").then(msg => {
            msg.delete({ timeout: 30000 })
        })
        const member = message.mentions.members.first();
        if (!member)
        return message.channel.send("You have not mentioned a user").then(msg => {
           msg.delete({ timeout: 30000 })
        })
    },
};