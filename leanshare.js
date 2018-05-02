const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

app.on('ready', () => {
    const mainWindow = new BrowserWindow({
        "width": 215,
        "height": 150,
        "resizable": false
    });

    mainWindow.setMenu(null)
    mainWindow.loadURL(`http://localhost:3000/`);

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
});
