const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    getCommands: () => ipcRenderer.invoke('get-commands'),
    getStats: (userId) => ipcRenderer.invoke('get-stats', userId)
});
