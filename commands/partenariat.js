const { SlashCommandBuilder } = require('discord.js');
let i = 0;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('partenariat')
        .setDescription('Compte le nombre de partenariats'),
  
async execute(interaction) {
    try {
        i++;
        await interaction.reply({ content: `Nombre de partenariats : ${i}`});
    } catch (error) {
        console.error(error);
        if (!interaction.replied) await interaction.reply('❌ Erreur lors de la réponse.');
    }
  }
};
