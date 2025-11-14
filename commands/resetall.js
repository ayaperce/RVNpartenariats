const {SlashCommandBuilder} = require('discord.js');
const fs = require('fs');
const { execute } = require('./partenariat');
const dataFile = './data.json';
const permFile = './perm.json';
const { createEmbed } = require('../utils/embed.js');

module.exports={
    data : new SlashCommandBuilder()
    .setName('resetall')
    .setDescription('Reset la db de partenaires ainsi que le nombre de partenariats'),

async execute(interaction){
    const readdata = fs.readFileSync(dataFile);
    const parsedata = JSON.parse(readdata);
    const readperm =  fs.readFileSync(permFile);
    const parseperm = JSON.parse(readperm);
    const usercmd = interaction.user.id;
    const isOwner = parseperm.userown.includes(usercmd);
    const isWl = parseperm.userwl.includes(usercmd);

    if (!isOwner && !isWl){
        const embed = createEmbed({
            title: 'Partenariats',
            description: `Vous n'avez pas cette permission`,
            type : 'error'
        });
        await interaction.reply({embeds : [embed]});
        return;
    }

    parsedata.partenariats = '0';
    parsedata.partenaires = '0';
    parsedata.utilisateurs = {};
    fs.writeFileSync(dataFile, JSON.stringify(parsedata, null, 2));
    
    const embed = createEmbed({
        title: 'Partenariats',
        description: `La DB partenariat a bien été réinitialisée`,
        type : 'success'
    });
    await interaction.reply({embeds : [embed]});
    return;
    }
}
