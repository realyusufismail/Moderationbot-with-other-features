module.exports = {
    name: 'help',
    description: 'All commands in this bot',
    execute(message, args) {
        message.reply("&ban and &kick will ban and kick a user. &add roleid @user will add a role and same apllies to &remove. &say makes the bot say someothing. Also if you &unban @user the user gets unbanned. Next is prune wich deleted messages can do 1 to 99.To do this do &prune 1 to 99. &sum is used in chat you can add 2 numbers to gether like 2 + 2 and it will give an answer of 4. To unban someone do &unban userid i am trying to changed this to @user but might not change.") ; 
    },
};