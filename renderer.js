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

async function fetchUsers() {
  const users = await ipcRenderer.invoke('fetch-users');
  const userList = document.getElementById('userList');
  userList.innerHTML = ''; // Clear the list before adding new items
  users.forEach(user => {
    const li = document.createElement('li');
    li.textContent = `${user.id} - ${user.name}`;
    userList.appendChild(li);
  });
}

document.getElementById('fetchUsersButton').addEventListener('click', fetchUsers);

async function fetchCommands() {
  const commands = await ipcRenderer.invoke('fetch-commands');
  const commandList = document.getElementById('commandList');
  commandList.innerHTML = ''; // Clear the list before adding new items
  commands.forEach(command => {
    const li = document.createElement('li');
    li.innerHTML = `<input type="text" value="${command.name}" data-id="${command.id}" />`;
    commandList.appendChild(li);
  });
}

document.getElementById('fetchCommandsButton').addEventListener('click', fetchCommands);

document.getElementById('saveCommandsButton').addEventListener('click', () => {
  const commands = [];
  document.querySelectorAll('#commandList input').forEach(input => {
    commands.push({ id: input.dataset.id, name: input.value });
  });
  ipcRenderer.send('save-commands', commands);
});
