const { SlashCommandBuilder } = require('discord.js');
const voiceDiscord = require('@discordjs/voice');
const { join } = require('node:path');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('help command'),
  async execute(interaction) {

    interaction.editReply({
      content: "/help\n/Outro\n/Intro",
      ephemeral: true,
    });
  },
};
