const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const connection = require('../db');

const temas = {
    programacio: [
        'javascript', 'ordinador', 'teclat', 'pantalla', 'software', 'hardware', 'codi', 'debugger', 'algoritme', 'compilador',
        'funcio', 'variable', 'classe', 'objecte', 'array', 'bucla', 'condicio', 'modul', 'paquet', 'servidor',
        'client', 'bucle', 'condicional', 'recursivitat', 'libreria', 'framework', 'sintaxi', 'backend', 'frontend', 'fullstack',
        'memoria', 'processador', 'sistema', 'fitxer', 'ruta', 'domini', 'protocol', 'SQL', 'consulta', 'transaccio',
        'terminal', 'comandament', 'ruta', 'domini', 'protocol', 'seguretat', 'xarxa', 'encriptacio', 'hash', 'clau'
    ],
    animals: [
        'gat', 'gos', 'elefant', 'jirafa', 'cocodril', 'tigre', 'lleo', 'lleopardi', 'rata', 'ratoli',
        'conill', 'cavall', 'porc', 'vaca', 'ovella', 'cabra', 'gallina', 'anec', 'oca', 'colom',
        'mussol', 'lloro', 'pingui', 'dofi', 'balena', 'tauro', 'tortuga', 'serp', 'llangardaix', 'granota',
        'peix', 'cranc', 'gamba', 'polp', 'calamar', 'estrella', 'corall', 'medusa', 'aranya', 'formiga',
        'abella', 'vespa', 'papallona', 'eruga', 'mosquit', 'escarabat', 'cuc', 'sargantana', 'mofeta', 'castor'
    ],
    esports: [
        'futbol', 'basquet', 'tennis', 'natacio', 'ciclisme', 'voleibol', 'handbol', 'rugbi', 'beisbol', 'hoquei',
        'esqui', 'snowboard', 'surf', 'escalada', 'gimnastica', 'boxa', 'judo', 'karate', 'taekwondo', 'halterofília',
        'esgrima', 'futgolf', 'golf', 'cricket', 'tennis de taula', 'badminton', 'paddle', 'patinatge', 'hipica', 'atletisme',
        'marato', 'ultramarato', 'triatlo', 'duatlo', 'pesca', 'vela', 'remo', 'piraguisme', 'esnorquel', 'barranquisme',
        'badminton', 'parkour', 'skateboarding', 'billar', 'dards', 'bowling', 'curling', 'sumo', 'poquer', 'motociclisme'
    ],
    menjar: [
        'poma', 'pera', 'platan', 'taronja', 'mandarina', 'maduixa', 'cirera', 'pruna', 'pressec', 'albercoc',
        'melo', 'sindria', 'kiwi', 'mango', 'pinya', 'raïm', 'figa', 'magrana', 'grosella', 'mora',
        'llimona', 'llima', 'areng', 'anxova', 'sardina', 'tonyina', 'salmo', 'bacalla', 'lluç', 'mero',
        'pollastre', 'vedella', 'porc', 'xai', 'conill', 'anec', 'galldindi', 'pernil', 'botifarra', 'xoriço',
        'croqueta', 'empanada', 'canelons', 'lasanya', 'hamburguesa', 'pizzes', 'entrepa', 'sandvitx', 'taco', 'burrito'
    ],
    natura: [
        'arbre', 'flor', 'arbust', 'herba', 'fulla', 'branques', 'arrel', 'tronc', 'llavors', 'fusta',
        'bosc', 'selva', 'desert', 'muntanya', 'riu', 'llac', 'ocea', 'mar', 'illa', 'peninsula',
        'volca', 'glacera', 'cova', 'pedra', 'roca', 'sorra', 'terra', 'fang', 'clima', 'temperatura',
        'pluja', 'neu', 'vent', 'tempesta', 'tornado', 'huraca', 'ciclo', 'meteorologia', 'geologia', 'ecologia',
        'biologia', 'ecosistema', 'especie', 'biodiversitat', 'conservacio', 'sostenibilitat', 'reciclatge', 'energia', 'aigua', 'aire'
    ],
    ciutats: [
        'Barcelona', 'Girona', 'Tarragona', 'Lleida', 'Madrid', 'Valencia', 'Sevilla', 'Malaga', 'Bilbao', 'Saragossa',
        'Santander', 'Oviedo', 'Toledo', 'Granada', 'Cordova', 'Alacant', 'Palma', 'Eivissa', 'Menorca', 'Formentera',
        'Logronyo', 'Pamplona', 'Valladolid', 'León', 'Salamanca', 'Burgos', 'Segovia', 'Avila', 'Caceres',
        'Badajoz', 'Murcia', 'Cartagena', 'Almeria', 'Jaen', 'Huelva', 'Cadis', 'Melilla', 'Ceuta',
        'Vitoria', 'Donostia', 'Ourense', 'Lugo', 'Pontevedra', 'Gijon', 'Reus', 'Viladecans'
    ],
    transports: [
        'cotxe', 'bicicleta', 'moto', 'autobus', 'tren', 'avio', 'barco', 'vaixell', 'tramvia', 'metro',
        'patinet', 'camio', 'furgoneta', 'taxi', 'teleferic', 'helicopter', 'globus', 'carro', 'tricicle', 'vagoneta',
        'submari', 'iot', 'canoa', 'piragua', 'zodiac', 'catamara', 'monopati',
        'quad', 'buggy', 'sidecar', 'autocaravana', 'caravana', 'remolc', 'aeropla', 'dirigible',
        'ferry', 'transbordador', 'segway', 'motoneta', 'scooter', 'funicular', 'karts', 'patins', 'bici'
    ],
    colors: [
        'blanc', 'negre', 'vermell', 'blau', 'verd', 'groc', 'taronja', 'rosa', 'lila', 'marro',
        'gris', 'turquesa', 'magenta', 'beix', 'daurat', 'platejat', 'porpra', 'fucsia', 'maragda', 'gessami',
        'ametista', 'beril', 'corall', 'malaquita', 'opal', 'peridot', 'rubi', 'safir', 'topazi', 'turmalina',
        'ambre', 'orquidia', 'albercoc', 'caoba', 'grafit', 'carbo', 'cel', 'ametller', 'oliva', 'menta',
        'lliri', 'nenufar', 'gessami', 'hortensia', 'lavanda', 'hibisc', 'magnolia', 'violeta', 'indigo', 'jade'
    ],
    professions: [
        'metge', 'infermera', 'enginyer', 'advocat', 'professor', 'policia', 'bomber', 'arquitecte', 'cuiner', 'mecanic',
        'electricista', 'fuster', 'plumber', 'jardiner', 'pintor', 'escombriaire', 'forner', 'pastisser', 'cambrer', 'repartidor',
        'actor', 'actriu', 'director', 'productor', 'escriptor', 'periodista', 'fotograf', 'dissenyador', 'publicista', 'economista',
        'administratiu', 'secretari', 'recepcionista', 'gestor', 'consultor', 'analista', 'programador', 'webmaster', 'editor',
        'traductor', 'interpret', 'psicoleg', 'farmaceutic', 'veterinari', 'dietista', 'nutricionista', 'bioleg', 'cientific'
    ],
    objectes: [
        'taula', 'cadira', 'sofa', 'llit', 'armari', 'llibreria', 'escriptori', 'ordinador', 'ratoli', 'teclat',
        'pantalla', 'mòbil', 'tauleta', 'televisio', 'altaveus', 'auriculars', 'llums', 'ventilador', 'calefactor', 'microones',
        'forn', 'nevera', 'congelador', 'rentadora', 'assecadora', 'rentaplats', 'batedora', 'torradora', 'cafetera', 'bullidor',
        'estufa', 'barbacoa', 'gronxador', 'llibre', 'revista', 'quadern', 'boligraf', 'llapis', 'goma', 'maquineta',
        'pinzell', 'pintura', 'full', 'carpeta', 'paperera', 'motxilla', 'maleta', 'paraguas', 'rellotge', 'calendari'
    ]
};

const db = require('../db');

const dibujosAhorcado = [
    '```  \n  \n  \n  \n  \n__```',
    '```  \n  \n  \n  \n  \n__\n|```',
    '```  \n  \n  \n  \n|\n__\n|```',
    '```  \n  \n  \n|\n|\n__\n|```',
    '```  \n  \n|\n|\n|\n__\n|```',
    '```  \n|\n|\n|\n|\n__\n|```',
    '```__\n|\n|\n|\n|\n__\n|```'
];

module.exports = {
    description: 'Inicia un joc del penjat.',
    run: async (message) => {
        const args = message.content.split(' ');
        if (args.length < 2) {
            return message.reply('Has d\'especificar el jugador que vols desafiar. Exemple: -penjat @nomUsuari');
        }

        const jugadorRetado = message.mentions.users.first();
        if (!jugadorRetado) {
            return message.reply('Has d\'especificar un usuari vàlid.');
        }

        const embedReto = new EmbedBuilder()
            .setColor('Blurple')
            .setTitle('Reto de Juego del Penjat')
            .setDescription(`${jugadorRetado}, has estat desafiat a un joc del penjat per ${message.author}. Tens 1 minut per acceptar.`);

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId('acceptar')
                .setLabel('Acceptar')
                .setStyle(ButtonStyle.Success),
            new ButtonBuilder()
                .setCustomId('rechazar')
                .setLabel('Rechazar')
                .setStyle(ButtonStyle.Danger)
        );

        const mensajeReto = await message.reply({ embeds: [embedReto], components: [row] });

        const filter = interaction => {
            return ['acceptar', 'rechazar'].includes(interaction.customId) && interaction.user.id === jugadorRetado.id;
        };

        const collector = message.channel.createMessageComponentCollector({ filter, time: 60000 });

        collector.on('collect', async interaction => {
            if (interaction.customId === 'acceptar') {
                collector.stop();
                await interaction.update({ components: [] });
                await iniciarJuegoAhorcado(message, jugadorRetado, true);
            } else if (interaction.customId === 'rechazar') {
                collector.stop();
                embedReto.setDescription(`El reto ha sido rechazado por ${jugadorRetado}.`);
                await interaction.update({ embeds: [embedReto], components: [] });
            }
        });

        collector.on('end', collected => {
            if (collected.size === 0) {
                embedReto.setDescription('No se ha recibido respuesta. El reto ha sido cancelado.');
                mensajeReto.edit({ embeds: [embedReto], components: [] });
            }
        });
    }
};

async function iniciarJuegoAhorcado(message, jugadorRetado, esReto = false) {
    const embedTema = new EmbedBuilder()
        .setColor('Blurple')
        .setTitle('Selecciona un tema per a començar el joc del penjat:')
        .setDescription('Prem un dels botons següents per seleccionar el tema.');

    const rows = [
        new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId('programacio')
                .setLabel('Programació')
                .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
                .setCustomId('animals')
                .setLabel('Animals')
                .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
                .setCustomId('esports')
                .setLabel('Esports')
                .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
                .setCustomId('menjar')
                .setLabel('Menjar')
                .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
                .setCustomId('natura')
                .setLabel('Natura')
                .setStyle(ButtonStyle.Primary)
        ),
        new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId('ciutats')
                .setLabel('Ciutats')
                .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
                .setCustomId('transports')
                .setLabel('Transports')
                .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
                .setCustomId('colors')
                .setLabel('Colors')
                .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
                .setCustomId('professions')
                .setLabel('Professions')
                .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
                .setCustomId('objectes')
                .setLabel('Objectes')
                .setStyle(ButtonStyle.Primary)
        )
    ];

    const mensajeTema = await message.reply({ embeds: [embedTema], components: rows });

    const filter = interaction => {
        return ['programacio', 'animals', 'esports', 'menjar', 'natura', 'ciutats', 'transports', 'colors', 'professions', 'objectes'].includes(interaction.customId) && interaction.user.id === message.author.id;
    };

    const collector = message.channel.createMessageComponentCollector({ filter, time: 15000 });

    collector.on('collect', async interaction => {
        const temaSeleccionado = interaction.customId;
        collector.stop();
        await interaction.update({ components: [] });
        await iniciarPartida(message, jugadorRetado, temaSeleccionado);
    });

    collector.on('end', collected => {
        if (collected.size === 0) {
            embedTema.setDescription('No s\'ha seleccionat cap tema. Joc cancel·lat.');
            mensajeTema.edit({ embeds: [embedTema], components: [] });
        }
    });
}

async function iniciarPartida(message, jugadorRetado, tema) {
    const palabras = temas[tema];
    const palabra = palabras[Math.floor(Math.random() * palabras.length)];
    let palabraMostrada = '_'.repeat(palabra.length).split('');
    let intentos = 6;
    const letrasIntentadas = [];
    const jugadores = [message.author, jugadorRetado];
    let turno = 0;

    console.log("Tema escollit: ",tema);
    console.log("Paraula escollida: ",palabra);

    const userId1 = message.author.id;
    const userId2 = jugadorRetado.id;
    const username1 = message.author.username;
    const username2 = jugadorRetado.username;

    const embed = new EmbedBuilder()
        .setColor('Blurple')
        .setTitle('🎮 Joc del penjat')
        .setDescription(`Tema: ${tema}\n\nParaula: \`${palabraMostrada.join(' ')}\`\n\nIntents restants: ${intentos}`)
        .addFields(
            { name: 'Lletres intentades', value: 'Cap lletra intentada encara.' },
            { name: 'Penjat', value: dibujosAhorcado[intentos] }
        );

    const mensajeJuego = await message.reply({ embeds: [embed] });

    const filter = response => {
        const letra = response.content.toLowerCase();
        return jugadores.includes(response.author) && /^[a-zàèìòùáéíóúç]$/.test(letra) && !letrasIntentadas.includes(letra);
    };

    const collector = message.channel.createMessageCollector({ filter, time: 60000 });

    collector.on('collect', response => {
        const letra = response.content.toLowerCase();
        letrasIntentadas.push(letra);

        if (palabra.includes(letra)) {
            for (let i = 0; i < palabra.length; i++) {
                if (palabra[i] === letra) {
                    palabraMostrada[i] = letra;
                }
            }
            // Incrementar letras correctas
            connection.query(
                'UPDATE estadisticas_jugador SET correct_letters = correct_letters + 1 WHERE user_id = ?',
                [response.author.id],
                (err) => {
                    if (err) {
                        console.error('Error al actualizar letras correctas:', err);
                    }
                }
            );
        } else {
            intentos--;
            // Incrementar letras incorrectas
            connection.query(
                'UPDATE estadisticas_jugador SET incorrect_letters = incorrect_letters + 1 WHERE user_id = ?',
                [response.author.id],
                (err) => {
                    if (err) {
                        console.error('Error al actualizar letras incorrectas:', err);
                    }
                }
            );
        }

        if (palabraMostrada.join('') === palabra) {
            embed.setDescription(`Tema: ${tema}\n\nParaula: \`${palabraMostrada.join(' ')}\`\n\n🎉 ${response.author} ha guanyat! La paraula era \`${palabra}\`.`)
                .setFields([]);
            collector.stop();

            // Incrementar juegos ganados
            connection.query(
                'UPDATE estadisticas_jugador SET games_won = games_won + 1 WHERE user_id = ?',
                [response.author.id],
                (err) => {
                    if (err) {
                        console.error('Error al actualizar los juegos ganados:', err);
                    }
                }
            );

            // Insertar registro de resultado
            connection.query(
                'INSERT INTO estadisticas (user_id, username, tema, palabra, resultado, fecha) VALUES (?, ?, ?, ?, "ganado", NOW())',
                [response.author.id, response.author.username, tema, palabra],
                (err) => {
                    if (err) {
                        console.error('Error al insertar el resultado del juego:', err);
                    }
                }
            );
        } else if (intentos === 0) {
            embed.setDescription(`Tema: ${tema}\n\nParaula: \`${palabraMostrada.join(' ')}\`\n\n😢 Tots dos han perdut. La paraula era \`${palabra}\`.`)
                .setFields([]);
            collector.stop();

            // Incrementar juegos perdidos
            connection.query(
                'UPDATE estadisticas_jugador SET games_lost = games_lost + 1 WHERE user_id = ?',
                [userId1],
                (err) => {
                    if (err) {
                        console.error('Error al actualizar los juegos perdidos:', err);
                    }
                }
            );

            connection.query(
                'UPDATE estadisticas_jugador SET games_lost = games_lost + 1 WHERE user_id = ?',
                [userId2],
                (err) => {
                    if (err) {
                        console.error('Error al actualizar los juegos perdidos:', err);
                    }
                }
            );

            // Insertar registro de resultado
            connection.query(
                'INSERT INTO estadisticas (user_id, username, tema, palabra, resultado, fecha) VALUES (?, ?, ?, ?, "perdido", NOW())',
                [userId1, username1, tema, palabra],
                (err) => {
                    if (err) {
                        console.error('Error al insertar el resultado del juego:', err);
                    }
                }
            );

            connection.query(
                'INSERT INTO estadisticas (user_id, username, tema, palabra, resultado, fecha) VALUES (?, ?, ?, ?, "perdido", NOW())',
                [userId2, username2, tema, palabra],
                (err) => {
                    if (err) {
                        console.error('Error al insertar el resultado del juego:', err);
                    }
                }
            );
        } else {
            embed.setDescription(`Tema: ${tema}\n\nParaula: \`${palabraMostrada.join(' ')}\`\n\nIntents restants: ${intentos}`)
                .setFields(
                    { name: 'Lletres intentades', value: letrasIntentadas.join(', ') },
                    { name: 'Penjat', value: dibujosAhorcado[intentos] }
                );
            turno = 1 - turno;
        }

        mensajeJuego.edit({ embeds: [embed] });
        response.delete();
    });

    collector.on('end', collected => {
        if (collected.size === 0) {
            embed.setDescription(`Tema: ${tema}\n\nParaula: \`${palabraMostrada.join(' ')}\`\n\n⏰ Temps esgotat! La paraula era \`${palabra}\`.`)
                .setFields([]);
            mensajeJuego.edit({ embeds: [embed] });
        }
    });
}