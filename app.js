const { ipcMain, BrowserWindow, app } = require('electron');

app.on('ready', () => {
    let mainWindow = new BrowserWindow({
        width: 400,
        height: 400
    });

    let secondWindow = new BrowserWindow({
        width: 400,
        height: 400,
        show: false
    });

    mainWindow.loadURL('file://' + __dirname + './index.html');
    secondWindow.loadURL('file://' + __dirname + './second-wnd.html');

    ipcMain.on('toggle-window', () => {
        if (secondWindow.isVisible()) secondWindow.hide();
        else secondWindow.show();
    });

    ipcMain.on('invokeAction', (event, data) => {
        mainWindow.webContents.send('actionReply', data);
        secondWindow.webContents.send('actionReply', data);
    });

    ipcMain.on('close-window', () => {
        if (secondWindow.isVisible()) {
            secondWindow.hide();
        } else {
            secondWindow = null;
            mainWindow = null;
            app.quit();
        }
    });

});
