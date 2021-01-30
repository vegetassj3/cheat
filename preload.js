const { ipcRenderer, contextBridge } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  windowAPI: {
    closeInputWindow() {
      ipcRenderer.send("closeInputWindow");
    },

    sendUrl(url) {
      ipcRenderer.send("sendUrl", url);
    },
    log(url) {
      ipcRenderer.send("log", url);
    },
    recieve(channel, func) {
      let validChannels = ["chapterList", "left", "right", "chapterData"];
      if (validChannels.includes(channel)) {
        ipcRenderer.on(channel, (event, args) => {
          func(args);
        });
      }
    },
  },
});
