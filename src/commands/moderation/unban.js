module.exports = {
    name: 'unban',
    description: 'Unbans a person who is banned',
    guildOnly: true,
    async execute(client, message, args) {
        if(!message.member.hasPermission('BAN_MEMBERS')){
            message.channel.send("You dont have permission to ban people!");
        
          }
        else {
          let memberId = message.content.substring(message.content.indexOf(' ') + 1);
        try {
          let unbannnedMember = await message.guild.members.unban(memberId);
          if(unbannnedMember)
          message.channel.send(unbannnedMember.tag + " was unbanned.");
        
        }
        catch(err){
          console.log(err);
        }
    }
        
    },
};