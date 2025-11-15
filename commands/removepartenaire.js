const {SlashCommandBuilder} = require('discord.js');
const fs = require('fs');
const { execute } = require('./partenariat');
const dataFile = './data.json';
const permFile = './perm.json';
const { createEmbed } = require('../utils/embed.js');


module.exports={
    data : new SlashCommandBuilder()
    .setName('removepartenaire')
    .setDescription(`Supprimer un partenaire de la DB des partenaires.`)
    .addStringOption(option =>
        option.setName('id')
        .setDescription(`ID de l'utilisateur a supprimer de la db des partenaires.`)
        .setRequired(true)
    ),

async execute(interaction){
    const ID_user = interaction.options.getString('id');
    const readdata = fs.readFileSync(dataFile);
    const parsedata = JSON.parse(readdata);
    const readperm =  fs.readFileSync(permFile);
    const parseperm = JSON.parse(readperm);
    const usercmd = interaction.user.id;
    const isWl = parseperm.userwl.includes(usercmd);
    const isOwner = parseperm.userown.includes(usercmd);


    if (!isWl && !isOwner){
            const embed = createEmbed({
            title: 'Partenariats',
            description: `Vous n'avez pas les permissions nécessaires.`,
            type : 'error'
        });
        await interaction.reply({ embeds: [embed] });
        return;
    }
        
    else if (!parsedata.utilisateurs[ID_user]){
            const embed = createEmbed({
            title: 'Partenariats',
            description: `l'utilisateur avec l'id ${ID_user} n'est pas enregistrer dans la DB des partenaires.`,
            type : 'warning'
        });
        await interaction.reply({ embeds: [embed] });
        return;
    }

    const pointsremove = parsedata.utilisateurs[ID_user].points
    parsedata.partenariats = parsedata.partenariats - pointsremove;
    parsedata.partenaires--;
    delete parsedata.utilisateurs[ID_user];
    fs.writeFileSync(dataFile, JSON.stringify(parsedata, null, 2));
        
    const embed = createEmbed({
        title: 'Partenariats',
        description: `L'utilisateur a bien été supprimer de la DB des partenaires.`,
        type : 'success'
    });
    await interaction.reply({ embeds: [embed] });
}
}
