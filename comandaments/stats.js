const { EmbedBuilder } = require('discord.js');
const connection = require('../db');

module.exports = {
    description: 'Mostra les estadístiques del joc del penjat.',
    run: async (message) => {
        const userId = message.author.id;

        connection.query('SELECT * FROM estadisticas_jugador WHERE user_id = ?', [userId], (err, results) => {
            if (err) {
                console.error('Error en recuperar les estadístiques:', err);
                message.reply('Ha ocorregut un error en recuperar les teves estadístiques.');
                return;
            }

            if (results.length === 0) {
                message.reply('Encara no tens estadístiques registrades.');
                return;
            }

            const stats = results[0];

            const embed = new EmbedBuilder()
                .setColor('Blue')
                .setTitle('📊 Les Teves Estadístiques del Joc del Penjat')
                .addFields(
                    { name: 'Jocs Jugats', value: stats.games_played ? stats.games_played.toString() : '0', inline: true },
                    { name: 'Jocs Guanyats', value: stats.games_won ? stats.games_won.toString() : '0', inline: true },
                    { name: 'Jocs Perduts', value: stats.games_lost ? stats.games_lost.toString() : '0', inline: true },
                    { name: 'Lletres Correctes', value: stats.correct_letters ? stats.correct_letters.toString() : '0', inline: true },
                    { name: 'Lletres Incorrectes', value: stats.incorrect_letters ? stats.incorrect_letters.toString() : '0', inline: true }
                );

            message.reply({ embeds: [embed] });
        });
    }
};