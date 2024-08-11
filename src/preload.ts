import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electron", {
  send: (channel: string, data: any) => {
    const validChannels = ["open-event-window", "close-event-window", "event-delete", "event-update", "event-add"];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  receive: (channel: string, func: Function) => {
    const validChannels = ["open-event-window"];
    if (validChannels.includes(channel)) {
      ipcRenderer.on(channel, (event, ...args) => {
        func(...args);
        console.log(args);
      });
    }
  },
});

contextBridge.exposeInMainWorld('api', {
    requestData: async () => {
        return await ipcRenderer.invoke('request-data');
    }
});