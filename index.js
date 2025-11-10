require('dotenv').config();
const token = process.env.TOKEN;
const botID = process.env.IDBOT;
const servID = process.env.IDSERV;
const { Client, GatewayIntentBits, Collection, REST, Routes, SlashCommandBuilder } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const command = new SlashCommandBuilder()
    .setName('partenariat')
    .setDescription('Compte le nombre de partenariats');

module.exports = {
    data: command,
    async execute(interaction) {
        const nom = interaction.options.getString('partenariat');
        await interaction.reply(`test`);
    }
};

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
    try {
        console.log(`Déploiement de 1 commandes...`);
        
        await rest.put(
            Routes.applicationGuildCommands(botID, servID),
            { body: command }
        );

        console.log('✅ Commandes déployées avec succès !');
    } catch (error) {
        console.error('❌ Erreur lors du déploiement :', error);
    }
})();

client.once('ready', () => {
    console.log(`✅ Connecté en tant que ${client.user.tag}`);
});

client.login(process.env.TOKEN);

