// import { contextBridge, ipcRenderer, IpcRendererEvent } from "electron";

// type ValidSendChannels = "toMain" | "saveEvent" | "deleteEvent" | "loadEvents";
// type ValidReceiveChannels = "fromMain" | "eventsLoaded";

// type Callback = (...args: any[]) => void;

// contextBridge.exposeInMainWorld("electron", {
//   send: (channel: ValidSendChannels, data: any) => {
//     const validChannels: ValidSendChannels[] = [
//       "toMain",
//       "saveEvent",
//       "deleteEvent",
//       "loadEvents",
//     ];
//     if (validChannels.includes(channel)) {
//       ipcRenderer.send(channel, data);
//     }
//   },
//   receive: (channel: ValidReceiveChannels, func: Callback) => {
//     const validChannels: ValidReceiveChannels[] = ["fromMain", "eventsLoaded"];
//     if (validChannels.includes(channel)) {
//       ipcRenderer.on(channel, (event: IpcRendererEvent, ...args: any[]) =>
//         func(...args)
//       );
//     }
//   },
// });
