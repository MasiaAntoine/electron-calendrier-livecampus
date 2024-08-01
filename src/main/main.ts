import { app, BrowserWindow, ipcMain } from "electron";
import * as path from "path";

let mainWindow: BrowserWindow;
let eventWindow: BrowserWindow | null = null; // Ajout pour la nouvelle fenêtre

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

function createEventWindow(selectedDate: string) {
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

  eventWindow
    .loadFile(path.join(__dirname, "../renderer/event.html"))
    .then(() => {
      console.log("Event window loaded successfully");
      // Envoyer la date sélectionnée à la fenêtre d'événements une fois chargée
      eventWindow?.webContents.send("open-event-window", selectedDate);
    })
    .catch((err) => {
      console.error("Failed to load event window:", err);
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

// Gestion des événements IPC

ipcMain.on("open-event-window", (event, selectedDate) => {
  console.log("Received request to open event window for date:", selectedDate);
  createEventWindow(selectedDate);
});

ipcMain.on("close-event-window", () => {
  if (eventWindow) {
    eventWindow.close();
  }
});
