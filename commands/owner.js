const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const permFile = './perm.json';

module.exports ={
    data : new SlashCommandBuilder()
    .setName('owner')
    .setDescription('Mettre owner un utilisateur.')
    .addStringOption(option =>
        option.setName('id')
        .setDescription(`ID de l'utilisateur à qui vous voulez ajouter aux owner.`)
        .setRequired(true)
    ),

async execute(interaction){
    const ID_user = interaction.options.getString('id');
    const readperm =  fs.readFileSync(permFile);
    const parseperm = JSON.parse(readperm);
    const usercmd = interaction.user.id;
    const isBuyer = parseperm.userbuyer.includes(usercmd);
    const isOwner = parseperm.userown.includes(usercmd);


    if (!isBuyer){
        await interaction.reply(`Vous n'êtes pas le buyer`);
        return;
    }
        
    else if (parseperm.userown[ID_user]){
        await interaction.reply(`l'utilisateur avec l'id ${ID_user} est déjà enregistrer dans la DB des owner.`);
        return;
    }

    parseperm.userown.push(ID_user);
    parseperm.owner++;
    fs.writeFileSync(permFile, JSON.stringify(parseperm, null, 2));
        
    await interaction.reply({
        content : `L'utilisateur a bien été ajouté aux owner.`
    });
}
}