const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, AttachmentBuilder } = require('discord.js');
const connection = require('../db');

const temas={
    programacio:[
    'javascript','ordinador','teclat','pantalla','software','hardware','codi','debugger','algoritme','compilador',
    'funcio','variable','classe','objecte','array','bucla','condicio','modul','paquet','servidor',
    'client','bucle','condicional','recursivitat','libreria','framework','sintaxi','backend','frontend','fullstack',
    'memoria','processador','sistema','fitxer','ruta','domini','protocol','sql','consulta','transaccio',
    'terminal','comandament','ruta','domini','protocol','seguretat','xarxa','encriptacio','hash','clau'
    ],
    animals:[
    'gat','gos','elefant','jirafa','cocodril','tigre','lleo','lleopardi','rata','ratoli',
    'conill','cavall','porc','vaca','ovella','cabra','gallina','anec','oca','colom',
    'mussol','lloro','pingui','dofi','balena','tauro','tortuga','serp','llangardaix','granota',
    'peix','cranc','gamba','polp','calamar','estrella','corall','medusa','aranya','formiga',
    'abella','vespa','papallona','eruga','mosquit','escarabat','cuc','sargantana','mofeta','castor'
    ],
    esports:[
    'futbol','basquet','tennis','natacio','ciclisme','voleibol','handbol','rugbi','beisbol','hoquei',
    'esqui','snowboard','surf','escalada','gimnastica','boxa','judo','karate','taekwondo','halterofilia',
    'esgrima','futgolf','golf','cricket','tennisdetaula','badminton','paddle','patinatge','hipica','atletisme',
    'marato','ultramarato','triatlo','duatlo','pesca','vela','remo','piraguisme','esnorquel','barranquisme',
    'badminton','parkour','skateboarding','billar','dards','bowling','curling','sumo','poquer','motociclisme'
    ],
    menjar:[
    'poma','pera','platan','taronja','mandarina','maduixa','cirera','pruna','pressec','albercoc',
    'melo','sindria','kiwi','mango','pinya','raim','figa','magrana','grosella','mora',
    'llimona','llima','areng','anxova','sardina','tonyina','salmo','bacalla','lluc','mero',
    'pollastre','vedella','porc','xai','conill','anec','galldindi','pernil','botifarra','xorico',
    'croqueta','empanada','canelons','lasanya','hamburguesa','pizzes','entrepa','sandvitx','taco','burrito'
    ],
    natura:[
    'arbre','flor','arbust','herba','fulla','branques','arrel','tronc','llavors','fusta',
    'bosc','selva','desert','muntanya','riu','llac','ocea','mar','illa','peninsula',
    'volca','glacera','cova','pedra','roca','sorra','terra','fang','clima','temperatura',
    'pluja','neu','vent','tempesta','tornado','huraca','ciclo','meteorologia','geologia','ecologia',
    'biologia','ecosistema','especie','biodiversitat','conservacio','sostenibilitat','reciclatge','energia','aigua','aire'
    ],
    ciutats:[
    'barcelona','girona','tarragona','lleida','madrid','valencia','sevilla','malaga','bilbao','saragossa',
    'santander','oviedo','toledo','granada','cordova','alacant','palma','eivissa','menorca','formentera',
    'logronyo','pamplona','valladolid','leon','salamanca','burgos','segovia','avila','caceres',
    'badajoz','murcia','cartagena','almeria','jaen','huelva','cadis','melilla','ceuta',
    'vitoria','donostia','ourense','lugo','pontevedra','gijon','reus','viladecans'
    ],
    transports:[
    'cotxe','bicicleta','moto','autobus','tren','avio','barco','vaixell','tramvia','metro',
    'patinet','camio','furgoneta','taxi','teleferic','helicopter','globus','carro','tricicle','vagoneta',
    'submari','iot','canoa','piragua','zodiac','catamara','monopati',
    'quad','buggy','sidecar','autocaravana','caravana','remolc','aeropla','dirigible',
    'ferry','transbordador','segway','motoneta','scooter','funicular','karts','patins','bici'
    ],
    colors:[
    'blanc','negre','vermell','blau','verd','groc','taronja','rosa','lila','marro',
    'gris','turquesa','magenta','beix','daurat','platejat','porpra','fucsia','maragda','gessami',
    'ametista','beril','corall','malaquita','opal','peridot','rubi','safir','topazi','turmalina',
    'ambre','orquidia','albercoc','caoba','grafit','carbo','cel','ametller','oliva','menta',
    'lliri','nenufar','gessami','hortensia','lavanda','hibisc','magnolia','violeta','indigo','jade'
    ],
    professions:[
    'metge','infermera','enginyer','advocat','professor','policia','bomber','arquitecte','cuiner','mecanic',
    'electricista','fuster','plumber','jardiner','pintor','escombriaire','forner','pastisser','cambrer','repartidor',
    'actor','actriu','director','productor','escriptor','periodista','fotograf','dissenyador','publicista','economista',
    'administratiu','secretari','recepcionista','gestor','consultor','analista','programador','webmaster','editor',
    'traductor','interpret','psicoleg','farmaceutic','veterinari','dietista','nutricionista','bioleg','cientific'
    ],
    objectes:[
    'taula','cadira','sofa','llit','armari','llibreria','escriptori','ordinador','ratoli','teclat',
    'pantalla','mobil','tauleta','televisio','altaveus','auriculars','llums','ventilador','calefactor','microones',
    'forn','nevera','congelador','rentadora','assecadora','rentaplats','batedora','torradora','cafetera','bullidor',
    'estufa','barbacoa','gronxador','llibre','revista','quadern','boligraf','llapis','goma','maquineta',
    'pinzell','pintura','full','carpeta','paperera','motxilla','maleta','paraguas','rellotge','calendari'
    ]
    };

const db = require('../db');

const imagenesAhorcado = [
    'https://cdn.discordapp.com/attachments/756615207383728218/1242861154888450128/Ahorcado_1.png?ex=664f6026&is=664e0ea6&hm=b54b6147f2d8642b7915384065398cdff328edeabddd1f5391f59d89d7c789e5&',
    'https://media.discordapp.net/attachments/756615207383728218/1242784447984697364/Ahorcado_5.png?ex=664f18b6&is=664dc736&hm=9bf66123860afc5d43d78f3fa0fa1284751fb1411ca24a5f0d7d6c5998fb51e1&=&format=webp&quality=lossless',
    'https://media.discordapp.net/attachments/756615207383728218/1242784447070339102/Ahorcado_4.png?ex=664f18b6&is=664dc736&hm=bd1dc73b1a52f93229974e312b726d4672ef5ab3f09d78d30c7136d958592537&=&format=webp&quality=lossless',
    'https://media.discordapp.net/attachments/756615207383728218/1242784450400616479/Ahorcado_3.png?ex=664f18b6&is=664dc736&hm=89ed01a7a69df20aedea8583eb4a4f641183d5899c097b756603086d1a2908b8&=&format=webp&quality=lossless',
    'https://media.discordapp.net/attachments/756615207383728218/1242784449968472104/Ahorcado_2.png?ex=664f18b6&is=664dc736&hm=0cecd36a3409292ac0b14b7984bb2d999510d08e8fd9f74d27c5d5cc22440dde&=&format=webp&quality=lossless',
    'https://media.discordapp.net/attachments/756615207383728218/1242784449465421874/Ahorcado_1.png?ex=664f18b6&is=664dc736&hm=2617e83f3d49585181f2b33edde61a42e51a899c37d2cae4c9596aca25d41698&=&format=webp&quality=lossless',
    'https://media.discordapp.net/attachments/756615207383728218/1242785015226433546/Ahorcado.png?ex=664f193d&is=664dc7bd&hm=04522a3760d7dbcd32c9fb61de5433919563df2e6a80ec4171c603f0756529e2&=&format=webp&quality=lossless',
];

module.exports = {
    description: 'Inicia un joc del penjat.',
    run: async (message) => {
        const embed = new EmbedBuilder()
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

        const mensajeInicial = await message.reply({ embeds: [embed], components: rows });

        const filter = interaction => {
            return ['programacio', 'animals', 'esports', 'menjar', 'natura', 'ciutats', 'transports', 'colors', 'professions', 'objectes'].includes(interaction.customId) && interaction.user.id === message.author.id;
        };

        const collector = message.channel.createMessageComponentCollector({ filter, time: 15000 });

        collector.on('collect', async interaction => {
            const temaSeleccionado = interaction.customId;
            collector.stop();
            await interaction.update({ components: [] });
            iniciarJuegoAhorcado(message, temaSeleccionado);
        });

        collector.on('end', collected => {
            if (collected.size === 0) {
                embed.setDescription('No s\'ha seleccionat cap tema. Joc cancel·lat.');
                mensajeInicial.edit({ embeds: [embed], components: [] });
            }
        });
    }
};

async function iniciarJuegoAhorcado(message, tema) {
    const palabras = temas[tema];
    const palabra = palabras[Math.floor(Math.random() * palabras.length)];
    let palabraMostrada = '_'.repeat(palabra.length).split('');
    let intentos = 6;
    const letrasIntentadas = [];

    console.log("Tema escollit: ", tema);
    console.log("Paraula escollida: ", palabra);

    const userId = message.author.id;
    const username = message.author.username;

    connection.query(
        'INSERT INTO estadisticas_jugador (user_id, username, games_played) VALUES (?, ?, 1) ON DUPLICATE KEY UPDATE games_played = games_played + 1',
        [userId, username],
        (err) => {
            if (err) {
                console.error('Error al actualizar los juegos jugados:', err);
            }
        }
    );

    const embed = new EmbedBuilder()
        .setColor('Blurple')
        .setTitle('🎮 Joc del penjat')
        .setDescription(`Tema: ${tema}\n\nParaula: \`${palabraMostrada.join(' ')}\`\n\nIntents restants: ${intentos}`)
        .setImage(imagenesAhorcado[intentos])
        .addFields(
            { name: 'Lletres intentades', value: 'Cap lletra intentada encara.' }
        );

    const mensajeJuego = await message.reply({ embeds: [embed] });

    const filter = response => {
        const letra = response.content.toLowerCase();
        return response.author.id === message.author.id && /^[a-zàèìòùáéíóúç]$/.test(letra) && !letrasIntentadas.includes(letra);
    };

    const collector = message.channel.createMessageCollector({ filter, time: 60000 });

    collector.on('collect', async response => {
        const letra = response.content.toLowerCase();
        letrasIntentadas.push(letra);

        if (palabra.includes(letra)) {
            for (let i = 0; i < palabra.length; i++) {
                if (palabra[i] === letra) {
                    palabraMostrada[i] = letra;
                }
            }

            connection.query(
                'UPDATE estadisticas_jugador SET correct_letters = correct_letters + 1 WHERE user_id = ?',
                [userId],
                (err) => {
                    if (err) {
                        console.error('Error al actualizar letras correctas:', err);
                    }
                }
            );
        } else {
            intentos--;

            connection.query(
                'UPDATE estadisticas_jugador SET incorrect_letters = incorrect_letters + 1 WHERE user_id = ?',
                [userId],
                (err) => {
                    if (err) {
                        console.error('Error al actualizar letras incorrectas:', err);
                    }
                }
            );
        }

        response.delete().catch(console.error);

        if (palabraMostrada.join('') === palabra) {
            embed.setDescription(`Tema: ${tema}\n\nParaula: \`${palabraMostrada.join(' ')}\`\n\n🎉 Has guanyat! La paraula era \`${palabra}\`.`)
                .setFields([])
                .setImage(imagenesAhorcado[intentos]);
            collector.stop();

            connection.query(
                'UPDATE estadisticas_jugador SET games_won = games_won + 1 WHERE user_id = ?',
                [userId],
                (err) => {
                    if (err) {
                        console.error('Error al actualizar los juegos ganados:', err);
                    }
                }
            );

            connection.query(
                'INSERT INTO estadisticas (user_id, username, tema, palabra, resultado, fecha) VALUES (?, ?, ?, ?, "ganado", NOW())',
                [userId, username, tema, palabra],
                (err) => {
                    if (err) {
                        console.error('Error al insertar el resultado del juego:', err);
                    }
                }
            );

            mensajeJuego.edit({ embeds: [embed] });
        } else if (intentos === 0) {
            embed.setDescription(`Tema: ${tema}\n\nParaula: \`${palabraMostrada.join(' ')}\`\n\n😢 Has perdut. L'has matat! La paraula era \`${palabra}\`.`)
                .setFields([])
                .setImage(imagenesAhorcado[intentos]);
            collector.stop();

            connection.query(
                'UPDATE estadisticas_jugador SET games_lost = games_lost + 1 WHERE user_id = ?',
                [userId],
                (err) => {
                    if (err) {
                        console.error('Error al actualizar los juegos perdidos:', err);
                    }
                }
            );

            connection.query(
                'INSERT INTO estadisticas (user_id, username, tema, palabra, resultado, fecha) VALUES (?, ?, ?, ?, "perdido", NOW())',
                [userId, username, tema, palabra],
                (err) => {
                    if (err) {
                        console.error('Error al insertar el resultado del juego:', err);
                    }
                }
            );

            mensajeJuego.edit({ embeds: [embed] });
        } else {
            embed.setDescription(`Tema: ${tema}\n\nParaula: \`${palabraMostrada.join(' ')}\`\n\nIntents restants: ${intentos}`)
                .setImage(imagenesAhorcado[intentos])
                .spliceFields(0, 1, { name: 'Lletres intentades', value: letrasIntentadas.join(', ') });

            mensajeJuego.edit({ embeds: [embed] });
        }
    });

    collector.on('end', () => {
        if (intentos > 0 && palabraMostrada.join('') !== palabra) {
            embed.setDescription(`Tema: ${tema}\n\nParaula: \`${palabra}\`\n\nEl temps per respondre ha expirat. 😢`)
                .setFields([])
                .setImage(imagenesAhorcado[0]);
            mensajeJuego.edit({ embeds: [embed] });
        }
    });
}