const {SlashCommandBuilder} = require('discord.js');
const fs = require('fs');
const { execute } = require('./partenariat');
const dataFile = './data.json';
const permFile = './perm.json';
const { createEmbed } = require('../utils/embed.js');

module.exports={
    data : new SlashCommandBuilder()
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

async execute(interaction){
    const readdata = fs.readFileSync(dataFile);
    const parsedata = JSON.parse(readdata);
    const readperm =  fs.readFileSync(permFile);
    const parseperm = JSON.parse(readperm);
    const usercmd = interaction.user.id;
    const isOwner = parseperm.userown.includes(usercmd);
    const isWl = parseperm.userwl.includes(usercmd);
    const userID = interaction.options.getString('id');
    const points = parsedata.utilisateurs[userID].points;
    const nbpoints = interaction.options.getInteger('nbpoints');

    if (!isOwner && !isWl){
        const embed = createEmbed({
            title: 'Partenariats',
            description: `Vous n'avez pas cette permission`,
            type : 'error'
        });
        await interaction.reply({embeds : [embed]});
        return;
    }

    else if (!parsedata.utilisateurs[userID]){
        const embed = createEmbed({
            title: 'Partenariats',
            description: `Cet utilisateur n'est pas présent dans la DB.`,
            type : 'warning'
        });
        await interaction.reply({embeds : [embed]});
        return;
    }

    else if (points < nbpoints){
        const embed = createEmbed({
            title: 'Partenariats',
            description: `Le nombre de points a supprimer est trop élever par rapport au nombre de points qu'a actuellement ce partenaire.`,
            type : 'warning'
        });
        await interaction.reply({embeds : [embed]});
        return;
    }

    parsedata.partenariats = parsedata.partenariats - nbpoints;
    const nvxpoints = parsedata.utilisateurs[userID].points - nbpoints;
    parsedata.utilisateurs[userID].points = nvxpoints;
    fs.writeFileSync(dataFile, JSON.stringify(parsedata, null, 2));
    
    const embed = createEmbed({
        title: 'Partenariats',
        description: `Les points de l'utilisateurs sont maintenant élever à ${nvxpoints}`,
        type : 'success'
    });
    await interaction.reply({embeds : [embed]});
    return;
    }
}
