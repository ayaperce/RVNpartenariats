const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const permFile = './perm.json';
const { createEmbed } = require('../utils/embed.js');

module.exports ={
    data : new SlashCommandBuilder()
    .setName('wl')
    .setDescription('Wl un utilisateur.')
    .addStringOption(option =>
        option.setName('id')
        .setDescription(`ID de l'utilisateur à qui vous voulez ajouter à la whitelist.`)
        .setRequired(true)
    ),

async execute(interaction){
    const ID_user = interaction.options.getString('id');
    const readperm =  fs.readFileSync(permFile);
    const parseperm = JSON.parse(readperm);
    const usercmd = interaction.user.id;
    const isWl = parseperm.userwl.includes(usercmd);
    const isOwner = parseperm.userown.includes(usercmd);


    if (!isOwner){
        
        const embed = createEmbed({
            title: 'Partenariats',
            description: `Vous n'êtes pas owner`,
            type : 'error'
        });
        await interaction.reply({embeds : [embed]});
        return;
    }
        
    else if (parseperm.userwl[ID_user]){
        const embed = createEmbed({
            title: 'Partenariats',
            description: `l'utilisateur avec l'id ${ID_user} est déjà enregistrer dans la DB des whitelist.`,
            type : 'warning'
        });
        await interaction.reply({embeds : [embed]});
        return;
    }

    parseperm.userwl.push(ID_user);
    parseperm.wl++;
    fs.writeFileSync(permFile, JSON.stringify(parseperm, null, 2));
    
    const embed = createEmbed({
            title: 'Partenariats',
            description: `L'utilisateur a bien été whitelist.`,
            type : 'success'
        });
    await interaction.reply({embeds : [embed]});
}
}