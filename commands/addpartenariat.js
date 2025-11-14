const {SlashCommandBuilder} = require('discord.js');
const fs = require('fs');
const { execute } = require('./partenariat');
const dataFile = './data.json';
const { createEmbed } = require('../utils/embed.js');


module.exports={
    data : new SlashCommandBuilder()
    .setName('addpartenariat')
    .setDescription('Ajouter un partenariat a un utilisateur déjà présent dans la DB')
    .addStringOption(option =>
        option.setName('id')
        .setDescription(`ID de l'utilisateur à qui vous voulez ajouter un partenariat.`)
        .setRequired(true)
    ),

async execute(interaction){
    const ID_user = interaction.options.getString('id');
    const readdata = fs.readFileSync(dataFile);
    const parsedata = JSON.parse(readdata);

    if (!parsedata.utilisateurs[ID_user]){
            const embed = createEmbed({
            title: 'Partenariats',
            description: `l'utilisateur avec l'id ${ID_user} n'est pas enregistrer dans la DB`,
            type : 'error'
        });
        await interaction.reply({ embeds: [embed] });
        return;
    }

    parsedata.partenariats++;
    parsedata.utilisateurs[ID_user].points++;
    fs.writeFileSync(dataFile, JSON.stringify(parsedata, null, 2));
    const partenariatuser = parsedata.utilisateurs[ID_user].points;
    
    const embed = createEmbed({
        title: 'Partenariats',
        description: `l'utilisateur ${ID_user} a maintenant ${partenariatuser} partenariats actifs.`,
        type : 'success'
    });
    await interaction.reply({ embeds: [embed] });
}
}