const { SlashCommandBuilder } = require("discord.js");
const voiceDiscord = require('@discordjs/voice');
const { join } = require('node:path');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("outro")
    .setDescription("Outro command"),
  async execute(interaction) {

    if (!interaction.member.voice.channel) {
      return interaction.reply({
        content: "You must be in a voice channel to use this command!",
        ephemeral: true
      });
    }


    const member = voiceDiscord.createAudioPlayer();
    const player = voiceDiscord.createAudioPlayer();
    const resource = voiceDiscord.createAudioResource(join(__dirname, '/../outroshort.mp3'), { inlineVolume: true });
    resource.volume.setVolume(0.5);

    const connection = voiceDiscord.joinVoiceChannel({
      channelId: interaction.member.voice.channel.id,
      guildId: interaction.guild.id,
      adapterCreator: interaction.guild.voiceAdapterCreator,
    });

    player.play(resource);
    connection.subscribe(player);


    player.on(voiceDiscord.AudioPlayerStatus.Idle, () => {
      connection.destroy();
	  interaction.member.voice.disconnect();
    });

    interaction.editReply({
      content: "Okay, I'll play the outro!",
      ephemeral: true
    })

  },
};
