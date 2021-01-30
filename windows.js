const { app, BrowserWindow } = require("electron");
const path = require("path");

const preload = path.join(__dirname, "preload.js");
const createMainWin = () => {
  Window.mainWin = new BrowserWindow({
    y: 0,
    x: 0,
    width: 200,
    height: 800,
    frame: false,
    webPreferences: {
      nodeIntegration: false,
      worldSafeExecuteJavaScript: true,
      contextIsolation: true,
      preload: preload,
    },
  });
  Window.mainWin.removeMenu();
  //Window.mainWin.webContents.openDevTools();
  Window.mainWin.loadURL(`file:/${__dirname}/index.html#/main`);
  Window.mainWin.on("closed", () => {
    Window.mainWin = null;
    app.quit();
  });
  Window.mainWin.webContents.on("new-window", (event) => {
    event.preventDefault();
  });
  return Window.mainWin;
};

const createInputWin = () => {
  if (!Window.inputWin) {
    Window.inputWin = new BrowserWindow({
      width: 400,
      height: 150,
      title: "please input URL",
      parent: Window.mainWin,
      frame: false,
      webPreferences: {
        nodeIntegration: false,
        worldSafeExecuteJavaScript: true,
        contextIsolation: true,
        preload: preload,
      },
    });
    Window.inputWin.removeMenu();

    Window.inputWin.loadURL(`file://${__dirname}/index.html#/input`);
    Window.inputWin.on("closed", () => {
      Window.inputWin = null;
    });

    return Window.inputWin;
  }
};

const Window = {
  mainWin: null,
  inputWin: null,
  createInputWin: createInputWin,
  createMainWin: createMainWin,
};

module.exports = Window;
