const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const dataFile = './data.json';
const { createEmbed } = require('../utils/embed.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('partenariatall')
        .setDescription('Affiche le nombre de partenariats'),
  
async execute(interaction) {
    try {
        const rawData = fs.readFileSync(dataFile);
        const data = JSON.parse(rawData);
        fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
        const embed = createEmbed({
            title: 'Partenariats',
            description: `Nombre de partenariats : ${data.partenariats}`,
            type : 'success'
        });
        await interaction.reply({ embeds: [embed] });
    } catch (error) {
        console.error(error);
        if (!interaction.replied) await interaction.reply('❌ Erreur lors de la réponse.');
    }
  }
};
