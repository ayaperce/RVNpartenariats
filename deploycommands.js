require('dotenv').config();
const { REST, Routes } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');

const token = process.env.TOKEN;
const clientId = process.env.IDBOT;
const guildId = process.env.IDSERV;

const commands = [new SlashCommandBuilder()
    .setName('partenariat')
    .setDescription('Compte le nombre de partenariats')
    .addStringOption(option =>
        option.setName('id')
        .setDescription('ID de l utilisateur dont vous souhaitez voir le nombre de partenariats actifs.')
        .setRequired(true)
    ),

    new SlashCommandBuilder()
        .setName('partenariatall')
        .setDescription('Affiche le nombre de partenariats'),

    

    new SlashCommandBuilder()
    .setName('addpartenariat')
    .setDescription('Ajouter un partenariat a un utilisateur déjà présent dans la DB')
    .addStringOption(option =>
        option.setName('id')
        .setDescription(`ID de l'utilisateur à qui vous voulez ajouter un partenariat.`)
        .setRequired(true)
    ),
    
    new SlashCommandBuilder()
    .setName('addpartnaire')
    .setDescription(`Ajouter un utilisateur dans la db des partenaires.`)
    .addStringOption(option =>
        option.setName('id')
        .setDescription(`ID de l'utilisateur que vous voulez ajoutez dans la db des partenaires.`)
        .setRequired(true)
    ),

    new SlashCommandBuilder()
    .setName('wl')
    .setDescription('Wl un utilisateur.')
    .addStringOption(option =>
        option.setName('id')
        .setDescription(`ID de l'utilisateur à qui vous voulez ajouter à la whitelist.`)
        .setRequired(true)
    ),

    ].map(cmd => cmd.toJSON());

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
    try {
        console.log('🔄 Déploiement des commandes...');
        await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commands }
    );
    console.log(`✅ ${commands.length} commandes déployées avec succès !`);
} catch (error) {
    console.error('❌ Erreur de déploiement :', error);
}
})();
