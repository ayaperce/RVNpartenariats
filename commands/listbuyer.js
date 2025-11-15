const {SlashCommandBuilder} = require('discord.js');
const fs = require('fs');
const { execute } = require('./partenariat');
const permFile = './perm.json';
const { createEmbed } = require('../utils/embed.js');

module.exports={
    data : new SlashCommandBuilder()
    .setName('listbuyer')
    .setDescription('Lister les utilisateurs ayant été ajoutés à la DB buyer.'),

async execute(interaction){
    const usercmd = interaction.user.id;
    const readperm = fs.readFileSync(permFile);
    const parseperm = JSON.parse(readperm);
    const isWl = parseperm.userwl.includes(usercmd);
    const isOwner = parseperm.userown.includes(usercmd);
    const buyer = parseperm.userbuyer;

    if (!isOwner && !isWl){
            const embed = createEmbed({
            title: 'Partenariats',
            description: `Vous n'avez pas les permissions nécessaires.`,
            type : 'error'
        });
        await interaction.reply({ embeds: [embed] });
        return;
    }

    if (!buyer || Object.keys(buyer).length === 0){
        const embed = createEmbed({
            title: 'Partenariats',
            description: `Il n'y a pas d'utilisateurs dans la BD des buyer.`,
            type : 'warning',
        })
        await interaction.reply({ embeds: [embed] });
        return;
    }

    let description = buyer.map(id => `<@${id}>`).join('\n');

        const embed = createEmbed({
            title: 'Liste des Whitelist',
            description,
            type: 'info'
        });

        await interaction.reply({ embeds: [embed] });
    }
};