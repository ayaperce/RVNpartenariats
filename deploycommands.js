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

    new SlashCommandBuilder()
    .setName('owner')
    .setDescription('Mettre owner un utilisateur.')
    .addStringOption(option =>
        option.setName('id')
        .setDescription(`ID de l'utilisateur à qui vous voulez ajouter aux owner.`)
        .setRequired(true)
    ),

    new SlashCommandBuilder()
    .setName('resetall')
    .setDescription('Reset la db de partenaires ainsi que le nombre de partenariats'),

    new SlashCommandBuilder()
    .setName('listpartenariats')
    .setDescription('Lister les utilisateurs partenaires avec leur nombre de partenariats actifs.'),

    new SlashCommandBuilder()
    .setName('resetallpoints')
    .setDescription(`Reset tous les points d'un utilisateur sans le supprimer de la DB.`)
    .addStringOption(option =>
        option.setName('id')
        .setDescription('ID de l utilisateur dont vous souhaitez voir le nombre de partenariats actifs.')
        .setRequired(true)
    ),

    new SlashCommandBuilder()
    .setName('resetpoints')
    .setDescription(`Reset un nombre points d'un utilisateur sans le supprimer de la DB.`)
    .addStringOption(option =>
        option.setName('id')
        .setDescription('ID de l utilisateur dont vous souhaitez supprimer des points.')
        .setRequired(true)
    )
    .addIntegerOption(option => 
        option
            .setName('nbpoints')
            .setDescription('Nombre de points que tu souhaite enlever')
            .setRequired(true)
    ),

    new SlashCommandBuilder()
    .setName('unwl')
    .setDescription('Enlever de la whitelist un utilisateur.')
    .addStringOption(option =>
        option.setName('id')
        .setDescription(`ID de l'utilisateur à qui vous voulez enlever la whitelist.`)
        .setRequired(true)
    ),

    new SlashCommandBuilder()
    .setName('unown')
    .setDescription('Enlever des owners un utilisateur.')
    .addStringOption(option =>
        option.setName('id')
        .setDescription(`ID de l'utilisateur à qui vous voulez enlever des owners.`)
        .setRequired(true)
    ),

    new SlashCommandBuilder()
    .setName('removepartenaire')
    .setDescription(`Supprimer un partenaire de la DB des partenaires.`)
    .addStringOption(option =>
        option.setName('id')
        .setDescription(`ID de l'utilisateur a supprimer de la db des partenaires.`)
        .setRequired(true)
    ),

    new SlashCommandBuilder()
    .setName('removenull')
    .setDescription(`Supprimer les partenaires qui ont 0 points dans la DB des partenaires.`),

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
