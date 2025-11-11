require('dotenv').config();
const { REST, Routes } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');

const token = process.env.TOKEN;
const clientId = process.env.IDBOT;
const guildId = process.env.IDSERV;

// Définir la commande
const command = new SlashCommandBuilder()
    .setName('partenariat')
    .setDescription('Compte le nombre de partenariats');

const commands = [command.toJSON()];

// Déploiement sur le serveur (test)
const rest = new REST({ version: '10' }).setToken(token);

(async () => {
    try {
        console.log('🔄 Déploiement des commandes...');
        await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commands }
    );
    console.log('✅ Commandes déployées avec succès !');
} catch (error) {
    console.error('❌ Erreur de déploiement :', error);
}
})();
