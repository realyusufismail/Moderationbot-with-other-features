module.exports = {
    
    name: 'unmute',
    description: 'Mute a person',
    guildOnly: true,
    execute(message, args) {
        if (message.member.hasPermission('MANAGE_ROLES')) {
            const role = message.guild.roles.cache.find(role => role.name === 'Muted');
            const member = message.mentions.members.first();
            member.roles.remove(role);
            message.channel.send(member + ' Has Been Unmuted');

        } else {
            message.channel.send("Please Mention Who To Unute")
        }

    },
};
