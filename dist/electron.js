const {app, BrowserWindow, Menu, Tray, nativeImage} = require('electron');
const path = require('path');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;
function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({width: 1280, height: 800});

  // and load the index.html of the app.
  win.loadURL(`file://${__dirname}/index.html`);

  // Open the DevTools.
  //win.webContents.openDevTools({mode: 'undocked'});

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })

  win.on('show', () => {
    //tray.setHighlightMode('always')
  })
  win.on('hide', () => {
    //tray.setHighlightMode('never')
  })

  tray = new Tray(path.join(__dirname, 'appicon.png'));
  const contextMenu = Menu.buildFromTemplate([
    {label: 'Item1', type: 'radio'},
    {label: 'Item2', type: 'radio'},
  ])
  tray.setToolTip('MK2 Application Tooltip')
  tray.setContextMenu(contextMenu)

  tray.on('click', function (event) {
    toggleWindow()

    // Show devtools when command clicked
    if (win.isVisible() && process.defaultApp && event.metaKey) {
      win.openDevTools({mode: 'detach'})
    }
  })

  Menu.setApplicationMenu(menu)
}

const toggleWindow = () => {
  if (win.isVisible()) {
    win.hide();
  } else {
    //showWindow()
    win.show();
  }
}

let tray = null;

const template = [
  
  {
    label: 'View',
    submenu: [
      {role: 'reload'},
      {role: 'forcereload'},
      {role: 'toggledevtools'},
      {type: 'separator'},
      {role: 'resetzoom'},
      {role: 'zoomin'},
      {role: 'zoomout'},
      {type: 'separator'},
      {role: 'togglefullscreen'}
    ]
  },
  {
    role: 'help',
    submenu: [
      {
        label: 'Learn More',
        click () { require('electron').shell.openExternal('https://electron.atom.io') }
      }
    ]
  }
]

if (process.platform === 'darwin') {
  template.unshift({
    label: app.getName(),
    submenu: [
      {role: 'about'},
      {role: 'quit'}
    ]
  })
}

const menu = Menu.buildFromTemplate(template)


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
