require('dotenv').config();  // Carga las variables de entorno desde el archivo .env

const { Client, Events } = require('discord.js');
const client = new Client({
    intents: 3276799
});

client.on(Events.ClientReady, async () => {
    console.log(`Usuari connectat com ${client.user.username}!`);
    process.send(`Usuari connectat com ${client.user.username}!`);
});

client.on(Events.MessageCreate, async (message) => {
    if (message.author.bot) return;
    if (!message.content.startsWith('-')) return;

    const args = message.content.slice(1).split(' ')[0];

    try {
        const command = require(`./comandaments/${args}`);
        command.run(message);
        console.log("Comandament utilitzat:", args);
    } catch (error) {
        console.log(`Ha sucedido un error al utilitzar el comandament -${args}`, error.message);
    }
});

client.on(Events.GuildMemberAdd, async (member) => {
    const welcomeChannelId = '1241765730307936327';
    const channel = await client.channels.fetch(welcomeChannelId);

    channel.send(`**Benvingut al servidor, **<@${member.user.id}>!`);
});

client.login(process.env.TOKEN);