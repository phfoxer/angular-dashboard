const { app, BrowserWindow } = require('electron')
const path = require('path')
const url = require('url')
let win


app.on('ready', function(){
    win = new BrowserWindow({ 'minWidth': 1024, 'minHeight': 600});
    // win.maximize();
    // win.show();
    // load the dist folder from Angular
    
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'dist/index.html'),
        protocol: 'file:',
        slashes: true
    }));

    // Open the DevTools optionally:
   // win.webContents.openDevTools()

    win.on('closed', () => {
        win = null
    })
});

app.on('browser-window-created', function (e, w) {
    w.setMenu(null);
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
})