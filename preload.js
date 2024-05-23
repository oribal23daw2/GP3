const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    getCommands: () => ipcRenderer.invoke('get-commands'),
    getLogsPartides: () => ipcRenderer.invoke('get-logs-partides'),
    getEstadistiques: () => ipcRenderer.invoke('get-estadistiques')
});
