module.exports = {
    name: 'ban',
    description: 'Banes the user',
    guildOnly: true,
    execute(message, args) {
        if (!message.member.hasPermission('BAN_MEMBERS'))
        return message.channel.send("Insufficient permissions (Requires permission `Ban members`)").then(msg => {
    msg.delete({ timeout: 30000 })
})
    const member = message.mentions.members.first();
    if (!member)
        return message.channel.send("You have not mentioned a user").then(msg => {
    msg.delete({ timeout: 30000 })
})
    if (!member.bannable)
        return message.channel.send("This user is unbannable").then(msg => {
    msg.delete({ timeout: 30000 })
})
    const reason = args.slice(1).join(" ")
    if (member) {
        if (!reason) return member.ban().then(member => {
            message.channel.send(`${member.user.tag} was banned, no reason was prov ed`);
        })

        if (reason) return member.ban(reason).then(member => {
            message.channel.send(`${member.user.tag} was banned for ${reason}`);
        })
    }
    },
};