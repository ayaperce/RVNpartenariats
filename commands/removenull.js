const {SlashCommandBuilder} = require('discord.js');
const fs = require('fs');
const { execute } = require('./partenariat');
const dataFile = './data.json';
const permFile = './perm.json';
const { createEmbed } = require('../utils/embed.js');


module.exports={
    data : new SlashCommandBuilder()
    .setName('removenull')
    .setDescription(`Supprimer les partenaires qui ont 0 points dans la DB des partenaires.`),

async execute(interaction){
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

    let removed = 0;

        for (const userid in parsedata.utilisateurs) {
            if (parsedata.utilisateurs[userid].points === 0) {
                delete parsedata.utilisateurs[userid];
                parsedata.partenaires--;
                removed++;
            }
        }

        fs.writeFileSync(dataFile, JSON.stringify(parsedata, null, 2));

        const embed = createEmbed({
            title: 'Partenariats',
            description: `${removed} utilisateur(s) avec 0 points ont été supprimés.`,
            type: 'success'
        });
        await interaction.reply({ embeds: [embed] });
    }
};