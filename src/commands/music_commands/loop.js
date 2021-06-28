
module.exports = {
      name: 'loop',
      memberName: 'join',
      guildOnly: true,
      description: 'Loop the currently playing song!',
  
  execute(message, args) {
    if (!message.guild.musicData.isPlaying) {
      message.reply(':x: There is no song playing right now!');
      return;
    } else if (
      message.guild.musicData.isPlaying &&
      message.guild.triviaData.isTriviaRunning
    ) {
      message.reply(':x: You cannot loop over a trivia!');
      return;
    } else if (
      message.member.voice.channel.id !== message.guild.me.voice.channel.id
    ) {
      message.reply(
        `You must be in the same voice channel as the bot in order to use that!`
      );
      return;
    }

    if (message.guild.musicData.loopSong) {
      message.guild.musicData.loopSong = false;
      message.channel.send(
        `**${message.guild.musicData.nowPlaying.title}** is no longer playing on repeat :repeat: `
      );
    } else {
      message.guild.musicData.loopSong = true;
      message.channel.send(
        `**${message.guild.musicData.nowPlaying.title}** is now playing on repeat :repeat: `
      );
    }
  }
};