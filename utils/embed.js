const { EmbedBuilder } = require('discord.js');

function createEmbed({ title, description, type = 'info' }) {
    
    const colors = {
        success: 0x00ff00,  
        error: 0xff0000,    
        warning: 0xffa500,  
        info: 0x0099ff      
    };

    return new EmbedBuilder()
        .setTitle(title)
        .setDescription(description)
        .setColor(colors[type] || colors.info)
        .setTimestamp();
}

module.exports = { createEmbed };
