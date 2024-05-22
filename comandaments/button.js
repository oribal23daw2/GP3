const {ButtonBuilder, ActionRowBuilder} = require('discord.js')

const usernameButton = new ButtonBuilder()
    .setCustomId('username')
    .setEmoji('📖')
    .setLabel('Mostrar nombre de usuario.')
    .setStyle(1);

const avatarButton = new ButtonBuilder()
    .setCustomId('avatar')
    .setEmoji('🌆')
    .setLabel('Mostrar avatar de usuario.')
    .setStyle(1);

module.exports = {
    description: 'Mostrar botons',
    run: async (message) => {
        const actionRow = new ActionRowBuilder().addComponents(usernameButton, avatarButton);

        message.reply({
            components: [actionRow],
        });
    }
}