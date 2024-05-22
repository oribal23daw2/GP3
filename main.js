const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const connection = require('./db'); // Asegúrate de que este archivo exista y esté configurado correctamente

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

// Maneja la solicitud para obtener las estadísticas del jugador
ipcMain.handle('get-stats', async (event, userId) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM estadisticas_jugador WHERE user_id = ?', [userId], (err, results) => {
            if (err) {
                console.error('Error en recuperar las estadísticas:', err);
                reject('Ha ocurrido un error en recuperar tus estadísticas.');
                return;
            }

            if (results.length === 0) {
                resolve(null); // No hay estadísticas registradas
                return;
            }

            resolve(results[0]);
        });
    });
});
