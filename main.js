const { app, globalShortcut, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const isDev = !app.isPackaged;
const window = require("./windows");
const getChapterList = require("./scraping/chapterList");
const getChapter = require("./scraping/chapterScrape");
const opts = {
  errorEventName: "error",
  logDirectory: "/logs", // NOTE: folder must exist and be writable...
  fileNamePattern: "roll-<DATE>.log",
  dateFormat: "YYYY.MM.DD",
};
const log = require("simple-node-logger").createRollingFileLogger(opts);

if (isDev) {
  require("electron-reload")(__dirname, {
    electron: path.join(__dirname, "node_modules", ".bin", "electron"),
  });
}
function devTools() {
  let win = BrowserWindow.getFocusedWindow();

  if (win) {
    win.toggleDevTools();
  }
}
app.whenReady().then(() => {
  window.createMainWin();
  app.on("browser-window-focus", function () {
    globalShortcut.register("Alt+CommandOrControl+I", devTools);
    globalShortcut.register("CommandOrControl+N", window.createInputWin);
    globalShortcut.register("CommandOrControl+left", () => {
      if (window.mainWin !== null) {
        window.mainWin.webContents.send("left");
      }
    });
    globalShortcut.register("CommandOrControl+right", () => {
      if (window.mainWin !== null) {
        window.mainWin.webContents.send("right");
      }
    });
  });
  app.on("browser-window-blur", function () {
    globalShortcut.unregister("Alt+CommandOrControl+I");
    globalShortcut.unregister("CommandOrControl+N");
    globalShortcut.unregister("CommandOrControl+left");
    globalShortcut.unregister("CommandOrControl+right");
  });
});

ipcMain.on("closeInputWindow", () => {
  if (window.inputWin !== null) {
    window.mainWin.focus();
    window.inputWin.close();
  }
});

ipcMain.on("log", (event, url) => {
  log.info("Visited : ", url, "  at ", new Date().toJSON());
});

ipcMain.on("sendUrl", (event, url) => {
  if (window.mainWin !== null) {
    if (url.includes("/chapter-")) {
      getChapter(url).then((chapterData) => {
        window.mainWin.webContents.send("chapterData", chapterData);
      });
    } else {
      getChapterList(url).then((chapterList) => {
        window.mainWin.webContents.send("chapterList", chapterList);
      });
    }
  }
});
