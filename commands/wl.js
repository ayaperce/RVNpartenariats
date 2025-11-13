const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const permFile = './perm.json';

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
        await interaction.reply(`Vous n'êtes pas owner`);
        return;
    }
        
    else if (parseperm.userwl[ID_user]){
        await interaction.reply(`l'utilisateur avec l'id ${ID_user} est déjà enregistrer dans la DB des whitelist.`);
        return;
    }

    parseperm.userwl.push(ID_user);
    fs.writeFileSync(permFile, JSON.stringify(parseperm, null, 2));
        
    await interaction.reply({
        content : `L'utilisateur a bien été whitelist.`
    });
}
}