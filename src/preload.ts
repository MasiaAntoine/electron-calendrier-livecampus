import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electron", {
  send: (channel: string, data: any) => {
    const validChannels = [
      "toMain",
      "saveEvent",
      "deleteEvent",
      "loadEvents",
      "open-event-window",
      "close-event-window",
    ];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  receive: (channel: string, func: Function) => {
    const validChannels = ["fromMain", "open-event-window", "eventsLoaded"];
    if (validChannels.includes(channel)) {
      ipcRenderer.on(channel, (event, ...args) => {
        func(...args);
        console.log(args);
      });
    }
  },
});
