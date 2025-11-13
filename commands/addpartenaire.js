const {SlashCommandBuilder} = require('discord.js');
const fs = require('fs');
const { execute } = require('./partenariat');
const dataFile = './data.json';
const permFile = './perm.json';

module.exports={
    data : new SlashCommandBuilder()
    .setName('addpartnaire')
    .setDescription(`Ajouter un utilisateur dans la db des partenaires.`)
    .addStringOption(option =>
        option.setName('id')
        .setDescription(`ID de l'utilisateur que vous voulez ajoutez dans la db des partenaires.`)
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
        await interaction.reply(`Vous n'êtes pas wl`);
        return;
    }
        
    else if (parsedata.utilisateurs[ID_user]){
        await interaction.reply(`l'utilisateur avec l'id ${ID_user} est déjà enregistrer dans la DB.`);
        return;
    }

    parsedata.utilisateurs[ID_user] = { points: 0 };
    fs.writeFileSync(dataFile, JSON.stringify(parsedata, null, 2));
        
    await interaction.reply({
        content : `L'utilisateur a bien été ajouter à la DB des partenaires.`
    });
}
}
