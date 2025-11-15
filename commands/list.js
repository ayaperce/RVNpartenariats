const {SlashCommandBuilder} = require('discord.js');
const fs = require('fs');
const { execute } = require('./partenariat');
const dataFile = './data.json';
const permFile = './perm.json';
const { createEmbed } = require('../utils/embed.js');

module.exports={
    data : new SlashCommandBuilder()
    .setName('listpartenariats')
    .setDescription('Lister les utilisateurs partenaires avec leur nombre de partenariats actifs.'),

async execute(interaction){
    const usercmd = interaction.user.id;
    const readperm = fs.readFileSync(permFile);
    const parseperm = JSON.parse(readperm);
    const readdata = fs.readFileSync(dataFile);
    const parsedata = JSON.parse(readdata);
    const isWl = parseperm.userwl.includes(usercmd);
    const isOwner = parseperm.userown.includes(usercmd);
    const user = parsedata.utilisateurs;

    if (!isOwner && !isWl){
            const embed = createEmbed({
            title: 'Partenariats',
            description: `Vous n'avez pas les permissions nécessaires.`,
            type : 'error'
        });
        await interaction.reply({ embeds: [embed] });
        return;
    }

    if (!user || Object.keys(user).length === 0){
        const embed = createEmbed({
            title: 'Partenariats',
            description: `Il n'y a pas d'utilisateurs dans la BD.`,
            type : 'warning',
        })
        await interaction.reply({ embeds: [embed] });
        return;
    }

    const sorted = Object.entries(user)
            .sort(([, a], [, b]) => b.points - a.points);
    let description = "";

        for (let [userId, info] of sorted) {
            description += `<@${userId}> — **${info.points} points**\n`;
        }

        const embed = createEmbed({
            title: 'Partenariats',
            description: (description),
            type : 'info'
        });
        await interaction.reply({ embeds: [embed] });
    }
};