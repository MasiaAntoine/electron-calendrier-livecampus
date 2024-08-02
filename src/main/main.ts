import { app, BrowserWindow, ipcMain } from "electron";
import * as path from "path";

let mainWindow: BrowserWindow;
let eventWindow: BrowserWindow | null = null;

function createWindow() {
  console.log("Creating main window");
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "../preload.js"),
    },
  });

  mainWindow
    .loadFile(path.join(__dirname, "../renderer/index.html"))
    .then(() => {
      console.log("Main window loaded successfully");
    })
    .catch((err) => {
      console.error("Failed to load main window:", err);
    });
}

function createEventWindow(selectedDate: string | null, event?: Event) {
  if (eventWindow) return;

  console.log("Creating event window");
  eventWindow = new BrowserWindow({
    width: 600,
    height: 400,
    parent: mainWindow,
    modal: true,
    webPreferences: {
      preload: path.join(__dirname, "../preload.js"),
    },
  });

  eventWindow.loadFile(path.join(__dirname, "../renderer/event.html"));

  eventWindow.webContents.once("dom-ready", () => {
    console.log("dom-ready");
    eventWindow?.webContents.send("open-event-window", {
      date: selectedDate,
      event,
    });
  });

  eventWindow.on("closed", () => {
    eventWindow = null;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.on(
  "open-event-window",
  (event, { date, event: eventData }: { date?: string; event?: Event }) => {
    console.log("Received request to open event window:", { date, eventData });
    createEventWindow(date || null, eventData);
  }
);

ipcMain.on("close-event-window", () => {
  if (eventWindow) {
    eventWindow.close();
  }
});
