const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const permFile = './perm.json';
const { createEmbed } = require('../utils/embed.js');

module.exports ={
    data : new SlashCommandBuilder()
    .setName('unwl')
    .setDescription('Enlever de la whitelist un utilisateur.')
    .addStringOption(option =>
        option.setName('id')
        .setDescription(`ID de l'utilisateur à qui vous voulez enlever la whitelist.`)
        .setRequired(true)
    ),

async execute(interaction){
    const ID_user = interaction.options.getString('id');
    const readperm =  fs.readFileSync(permFile);
    const parseperm = JSON.parse(readperm);
    const usercmd = interaction.user.id;
    const isWl = parseperm.userwl.includes(usercmd);
    const isOwner = parseperm.userown.includes(usercmd);
    const isBuyer = parseperm.userbuyer.includes(usercmd);


    if (!isOwner && !isBuyer){
        
        const embed = createEmbed({
            title: 'Partenariats',
            description: `Vous n'êtes pas owner`,
            type : 'error'
        });
        await interaction.reply({embeds : [embed]});
        return;
    }
        
    else if (!parseperm.userwl.includes(ID_user)){
        const embed = createEmbed({
            title: 'Partenariats',
            description: `l'utilisateur avec l'id ${ID_user} n'est pas enregistrer dans la DB des whitelist.`,
            type : 'warning'
        });
        await interaction.reply({embeds : [embed]});
        return;
    }

    parseperm.userwl = parseperm.userwl.filter(id => id !== ID_user);
    parseperm.wl--;
    fs.writeFileSync(permFile, JSON.stringify(parseperm, null, 2));
    
    const embed = createEmbed({
            title: 'Partenariats',
            description: `L'utilisateur a bien été supprimer de la whitelist.`,
            type : 'success'
        });
    await interaction.reply({embeds : [embed]});
}
}