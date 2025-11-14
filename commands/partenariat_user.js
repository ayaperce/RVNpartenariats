const {SlashCommandBuilder} = require('discord.js');
const fs = require('fs');
const { execute } = require('./partenariat');
const dataFile = './data.json';
const { createEmbed } = require('../utils/embed.js');


module.exports={
    data : new SlashCommandBuilder()
    .setName('partenariat')
    .setDescription('Voir le nombre de partnariats dune personne')
    .addStringOption(option =>
        option.setName('id')
        .setDescription('ID de l utilisateur dont vous souhaitez voir le nombre de partenariats actifs.')
        .setRequired(true)
    ),

async execute(interaction){
    const ID_user = interaction.options.getString('id');
    const readdata = fs.readFileSync(dataFile);
    const parsedata = JSON.parse(readdata);

    if (!parsedata.utilisateurs[ID_user]){
        await interaction.reply(`l'utilisateur avec l'id ${ID_user} n'est pas enregistrer dans la DB`);
        return;
    }

    const partenariatuser = parsedata.utilisateurs[ID_user].points;

    const embed = createEmbed({
            title: 'Partenariats',
            description: `l'utilisateur ${ID_user} a ${partenariatuser} partenariats actifs.`,
            type : 'success'
        });
        await interaction.reply({ embeds: [embed] });
}
}