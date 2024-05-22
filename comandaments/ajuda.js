const { EmbedBuilder } = require('discord.js');

module.exports = {
    description: 'Mostra informació sobre tots els comandaments i funcionalitats del bot.',
    run: async (message) => {
        const embed = new EmbedBuilder()
            .setColor('Blurple')
            .setTitle(' ℹ Com utilitzar el bot')
            .setDescription('Aquí tens una llista de tots els comandaments disponibles i les seves funcionalitats:')
            .addFields(
                { name: '🎮 Penjat', value: '`-penjat` - Inicia un joc del penjat. Endevina la paraula lletra per lletra.' },
                { name: '🎮 Penjat cooperatiu', value: '`-vs @NomUsuari` - Inicia un joc del penjat multijugador. Endevina la paraula lletra per lletra.' },
                { name: '🖼️ Avatar', value: '`-avatar` - Mostra el teu avatar o el de la persona mencionada.' },
                { name: '🗣️ Repetir', value: '`-repeteix` - El bot repetirà el que li diguis, com un "Simón diu".' },
                { name: '📊 Estadístiques', value: '`-stats` - Mostra les teves estadístiques des de la base de dades.' },
                { name: '🔍 Com veure més informació', value: 'Per obtenir més informació sobre cada comandament, pots enviar un correu electrònic a `15586216.clot@fje.edu`.' }
            )
            .setFooter({ text: 'Disfruta jugant i explorant les funcionalitats del bot!' });

        await message.reply({ embeds: [embed] });
    }
};
