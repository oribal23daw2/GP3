require('dotenv').config();  // Carga las variables de entorno desde el archivo .env
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const connection = require('./db');
const { Client, GatewayIntentBits, Events } = require('discord.js');

// Configuración del cliente de Discord
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ]
});

// Evento que se dispara cuando el cliente está listo
client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

// Inicia sesión con el token del bot desde el archivo .env
client.login(process.env.TOKEN).catch(error => {
    console.error('Error al iniciar sesión:', error);
});

// Evento que se dispara cuando el cliente está listo
client.on(Events.ClientReady, async () => {
    console.log(`Usuari connectat com ${client.user.username}!`);
    process.send?.(`Usuari connectat com ${client.user.username}!`);
});

// Evento que se dispara cuando se crea un mensaje
client.on(Events.MessageCreate, async (message) => {
    if (message.author.bot) return;  // Ignora los mensajes de los bots
    if (!message.content.startsWith('-')) return;  // Ignora los mensajes que no empiezan con '-'

    const args = message.content.slice(1).split(' ')[0];

    try {
        const command = require(`./comandaments/${args}`);
        command.run(message);
        console.log("Comandament utilitzat:", args);
    } catch (error) {
        console.log(`Ha sucedido un error al utilitzar el comandament -${args}`, error.message);
    }
});

// Evento que se dispara cuando un nuevo miembro se une a un servidor
client.on(Events.GuildMemberAdd, async (member) => {
    const welcomeChannelId = '1241765730307936327';  // ID del canal de bienvenida
    const channel = await client.channels.fetch(welcomeChannelId);

    channel.send(`**Benvingut al servidor, **<@${member.user.id}>!`);
});

// Función para crear la ventana de Electron
function createWindow() {
    const win = new BrowserWindow({
        width: 1920,
        height: 1080,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            enableRemoteModule: false,
            nodeIntegration: false
        }
    });

    win.loadFile('index.html');
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

// Maneja la solicitud para obtener los archivos de comandos
ipcMain.handle('get-commands', async () => {
    const commandsPath = path.join(__dirname, 'comandaments');
    const files = await fs.promises.readdir(commandsPath);
    const jsFiles = files.filter(file => file.endsWith('.js'));
    return jsFiles;
});

// Maneja la solicitud para renombrar un archivo de comando
ipcMain.handle('rename-command', async (event, oldName, newName) => {
    const commandsPath = path.join(__dirname, 'comandaments');
    const oldPath = path.join(commandsPath, oldName);
    const newPath = path.join(commandsPath, newName);
    try {
        await fs.promises.rename(oldPath, newPath);
        return { success: true };
    } catch (error) {
        console.error('Error renaming file:', error);
        return { success: false, error: error.message };
    }
});

// Maneja la solicitud para obtener los registros de partidas
ipcMain.handle('get-logs-partides', async () => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM estadisticas', (err, results) => {
            if (err) {
                console.error('Error en recuperar los registros:', err);
                reject('Ha ocurrido un error en recuperar los registros.');
                return;
            }
            resolve(results);
        });
    });
});

// Maneja la solicitud para obtener las estadísticas de los jugadores
ipcMain.handle('get-estadistiques', async () => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM estadisticas_jugador', (err, results) => {
            if (err) {
                console.error('Error en recuperar las estadísticas:', err);
                reject('Ha ocurrido un error en recuperar las estadísticas.');
                return;
            }
            resolve(results);
        });
    });
});
