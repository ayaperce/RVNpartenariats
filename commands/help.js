const {SlashCommandBuilder} = require('discord.js');
const fs = require('fs');
const { execute } = require('./partenariat');
const { createEmbed } = require('../utils/embed.js');
const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Afficher la liste des commandes disponibles.'),

async execute(interaction) {

    const commandsPath = path.join(__dirname); // dossier actuel
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    let description = '';

    for (const file of commandFiles) {
        if (file === 'help.js') continue; // éviter de s'afficher soi-même si tu veux

        const command = require(path.join(commandsPath, file));

        if (command.data && command.data.name && command.data.description) {
            description += `**/${command.data.name}** → ${command.data.description}\n`;
        }
    }

    const embed = {
        title: '📘 Liste des commandes',
        description: description || 'Aucune commande trouvée.',
        type : 'info',
    };

    await interaction.reply({ embeds: [embed], ephemeral: true });
}
};
