const { SlashCommandBuilder } = require('discord.js');
const voiceDiscord = require('@discordjs/voice');
const { join } = require('node:path');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('intro')
    .setDescription('Intro command'),
  async execute(interaction) {
    if (!interaction.member.voice.channel) {
      return interaction.reply({
        content: 'You must be in a voice channel to use this command!',
        ephemeral: true,
      });
    }

    const player = voiceDiscord.createAudioPlayer();
    const resource = voiceDiscord.createAudioResource(
      join(__dirname, '../sound/intro.mp3'),
      { inlineVolume: true }
    );
    resource.volume.setVolume(0.5);

    const connection = voiceDiscord.joinVoiceChannel({
      channelId: process.env.channelId,
      guildId: interaction.guild.id,
      adapterCreator: interaction.guild.voiceAdapterCreator,
    });

    player.play(resource);
    connection.subscribe(player);

    player.on(voiceDiscord.AudioPlayerStatus.Idle, () => {
      connection.destroy();
      interaction.member.voice.setChannel(process.env.channelId);
      if (!interaction.member.voice.channel) {
        return interaction.editReply({
          content: 'You are not in a voice channel!',
          ephemeral: true,
        });
      } return;
    });

    interaction.editReply({
      content: "Okay, I'll play the intro!",
      ephemeral: true,
    });
  },
};
