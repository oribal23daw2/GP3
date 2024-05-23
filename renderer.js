const { ipcRenderer } = require('electron');

ipcRenderer.on('bot-status', (event, status) => {
  document.getElementById('status').textContent = status;
});

document.getElementById('sendCommand').addEventListener('click', () => {
  const command = document.getElementById('commandInput').value;
  ipcRenderer.send('send-command', command);
  document.getElementById('commandInput').value = '';
});

ipcRenderer.on('bot-log', (event, log) => {
  const logs = document.getElementById('logs');
  logs.textContent += log + '\n';
  logs.scrollTop = logs.scrollHeight;
});