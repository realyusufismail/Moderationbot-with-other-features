module.exports = {
      name: 'join',
      memberName: 'join',
      guildOnly: true,
      clientPermissions: ['SPEAK', 'CONNECT'],
      description:
        'Allows an Admin to summon the bot to your voice-channel when music is playing.',
    


  async run(message) {
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) {
      message.reply(':no_entry: Please join a voice channel and try again!');
      return;
    }
    if (message.guild.triviaData.isTriviaRunning == true) {
      message.reply(':x: Please try after the trivia has ended!');
      return;
    }
    if (message.guild.musicData.isPlaying != true) {
      message.reply(':x: Nothing is Playing');
      return;
    }
    try {
      await voiceChannel.join();
      return;
    } catch {
      message.reply(
        ':x Something went wrong while attempting to move channels'
      );
      return;
    }
  }

};