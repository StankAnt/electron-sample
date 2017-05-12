const {ipcRenderer, remote} = require('electron');
const {Menu} = remote;

const menu = Menu.buildFromTemplate([
    {
        label: 'Electron',
        submenu: [
            {
                label: 'second-wnd',
                click: () => {
                    ipcRenderer.send('toggle-window');
                    //code here
                }
            },
            {
                label: 'exit',
                click: () => {
                    ipcRenderer.send('close-window');
                    //code here
                }
            }
        ]
    }
]);

Menu.setApplicationMenu(menu);

let inputField = document.getElementById('text-field');

if (inputField) {
    inputField.addEventListener('input', () => {
        ipcRenderer.send('invokeAction', inputField.value);
    });
}

ipcRenderer.on('actionReply', (event, data) => {
    if (inputField) {
        inputField.value = data;
    }
});
