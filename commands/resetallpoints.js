const {SlashCommandBuilder} = require('discord.js');
const fs = require('fs');
const { execute } = require('./partenariat');
const dataFile = './data.json';
const permFile = './perm.json';
const { createEmbed } = require('../utils/embed.js');

module.exports={
    data : new SlashCommandBuilder()
    .setName('resetallpoints')
    .setDescription(`Reset tous les points d'un utilisateur sans le supprimer de la DB.`)
    .addStringOption(option =>
        option.setName('id')
        .setDescription('ID de l utilisateur dont vous souhaitez voir le nombre de partenariats actifs.')
        .setRequired(true)
    ),

async execute(interaction){
    const readdata = fs.readFileSync(dataFile);
    const parsedata = JSON.parse(readdata);
    const readperm =  fs.readFileSync(permFile);
    const parseperm = JSON.parse(readperm);
    const usercmd = interaction.user.id;
    const isOwner = parseperm.userown.includes(usercmd);
    const isWl = parseperm.userwl.includes(usercmd);
    const userID = interaction.options.getString('id');

    if (!isOwner && !isWl){
        const embed = createEmbed({
            title: 'Partenariats',
            description: `Vous n'avez pas cette permission`,
            type : 'error'
        });
        await interaction.reply({embeds : [embed]});
        return;
    }

    if (!parsedata.utilisateurs[userID]){
        const embed = createEmbed({
            title: 'Partenariats',
            description: `Cet utilisateur n'est pas présent dans la DB.`,
            type : 'warning'
        });
        await interaction.reply({embeds : [embed]});
        return;
    }

    const points = parsedata.utilisateurs[userID].points;
    parsedata.partenariats = parsedata.partenariats - points;
    parsedata.utilisateurs[userID].points = 0;
    fs.writeFileSync(dataFile, JSON.stringify(parsedata, null, 2));
    
    const embed = createEmbed({
        title: 'Partenariats',
        description: `tous les points de l'utilisateurs sont maintenant redescendu à 0`,
        type : 'success'
    });
    await interaction.reply({embeds : [embed]});
    return;
    }
}
