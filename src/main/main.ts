import { app, BrowserWindow, ipcMain, Menu, dialog } from "electron";
import * as path from "path";
import * as fs from "fs";
import { createEvents, EventAttributes } from "ics";
import { open, Database } from "sqlite";
import sqlite3 from "sqlite3";
let db: Database<sqlite3.Database, sqlite3.Statement>;

async function initDatabase() {
  db = await open({
    filename: path.join(__dirname, "events.db"),
    driver: sqlite3.Database,
  });

  //await db.exec(`
  //  CREATE TABLE IF NOT EXISTS events (
  //    id INTEGER PRIMARY KEY AUTOINCREMENT,
  //    titre TEXT,
  //    description TEXT,
  //    date_deb TEXT,
  //    date_fin TEXT,
  //    location TEXT,
  //    categorie TEXT,
  //    statut TEXT,
  //    transparence TEXT,
  //    nbMaj INTEGER,
  //  )
  //`);
}

async function getEvents() {
  console.log("fetch");
  const events = await db.all("SELECT * FROM events");
  const data = events.map((event: any) => ({
    ...event,
    date_deb: new Date(event.date_deb),
    date_fin: new Date(event.date_fin),
  }));
  console.log(data);
  return data;
}

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

  const menu = Menu.buildFromTemplate([
    {
      label: "Fichier",
      submenu: [
        {
          label: "Exporter l'agenda",
          click: () => {
            handleExportCalendar();
          },
        },
        {
          label: "Importer un agenda",
          click: () => {
            handleImportCalendar();
          },
        },
        { type: "separator" },
        {
          label: "Quitter",
          role: "quit",
        },
      ],
    },
  ]);
  //Menu.setApplicationMenu(menu);
}

function createEventWindow(selectedDate: string | null, event?: any) {
  if (eventWindow) return;

  console.log("Creating event window");
  eventWindow = new BrowserWindow({
    width: 500,
    height: 800,
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

function handleExportCalendar() {
  const sampleEvents: any[] = [
    {
      id: 1,
      title: "Réunion",
      description: "Réunion avec l'équipe de projet",
      start: new Date(),
      end: new Date(new Date().getTime() + 60 * 60 * 1000),
      location: "Bureau 42",
      category: "Travail",
      status: "CONFIRMED",
      transparency: "BUSY",
      version: 1,
    },
  ];

  exportToICS(sampleEvents);
}

function exportToICS(events: any[]) {
  const icsEvents: EventAttributes[] = events.map((event) => ({
    start: [
      event.start.getFullYear(),
      event.start.getMonth() + 1,
      event.start.getDate(),
      event.start.getHours(),
      event.start.getMinutes(),
    ],
    end: [
      event.end.getFullYear(),
      event.end.getMonth() + 1,
      event.end.getDate(),
      event.end.getHours(),
      event.end.getMinutes(),
    ],
    title: event.title,
    description: event.description,
    location: event.location,
    status: event.status,
    busyStatus: event.transparency,
  }));

  createEvents(icsEvents, (error, value) => {
    if (error) {
      console.error("Error creating ICS file:", error);
      return;
    }

    const savePath = dialog.showSaveDialogSync(mainWindow, {
      title: "Enregistrer l'agenda en tant que...",
      defaultPath: "agenda.ics",
      filters: [{ name: "Fichier ICS", extensions: ["ics"] }],
    });

    if (savePath) {
      fs.writeFileSync(savePath, value);
      console.log("Agenda exporté avec succès à", savePath);
    }
  });
}

function handleImportCalendar() {
  const importPath = dialog.showOpenDialogSync(mainWindow, {
    title: "Importer un agenda",
    filters: [{ name: "Fichier ICS", extensions: ["ics"] }],
    properties: ["openFile"],
  });

  if (importPath && importPath[0]) {
    const icsData = fs.readFileSync(importPath[0], "utf-8");
    console.log("Fichier ICS importé:", icsData);
  }
}

app.on("ready", async () => {
  await initDatabase();
  createWindow();
});

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
  (event, { date, event: eventData }: { date?: string; event?: any }) => {
    console.log("Received request to open event window:", { date, eventData });
    createEventWindow(date || null, eventData);
  }
);

ipcMain.on("close-event-window", () => {
  console.log("close");
  if (eventWindow) {
    eventWindow.close();
  }
});

ipcMain.on("event-form-submit", () => {
  console.log("ok");
});

ipcMain.on("event-delete", async (event, id) => {
  try {
    console.log("Received delete request for ID:", id);
    await db.run("DELETE FROM events WHERE id = ?", [id]);
    console.log("Event with ID", id, "deleted successfully");
  } catch (error) {
    console.error("Error deleting event:", error);
  }
});

ipcMain.on("event-update", async (event, updatedEvent) => {
  try {
    console.log("Received update request for event:", updatedEvent);
    const { id, titre, description, date_deb, date_fin, location, categorie, statut, transparence, nbMaj } = updatedEvent;
    await db.run(
      `UPDATE events
       SET titre = ?, description = ?, date_deb = ?, date_fin = ?, location = ?, categorie = ?, statut = ?, transparence = ?, nbMaj = ?
       WHERE id = ?`,
      [titre, description, date_deb, date_fin, location, categorie, statut, transparence, nbMaj, id]
    );
    console.log("Event with ID", id, "updated successfully");
  } catch (error) {
    console.error("Error updating event:", error);
  }
});

ipcMain.on("event-add", async (event, newEvent) => {
  try {
    console.log("Received add request for event:", newEvent);
    const { titre, description, date_deb, date_fin, location, categorie, statut, transparence, nbMaj } = newEvent;
    await db.run(
      `INSERT INTO events (titre, description, date_deb, date_fin, location, categorie, statut, transparence, nbMaj)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [titre, description, date_deb, date_fin, location, categorie, statut, transparence, nbMaj]
    );
    console.log("Event added successfully");
  } catch (error) {
    console.error("Error adding event:", error);
  }
});

ipcMain.handle('request-data', async (event) => {
    console.log("fetch1");
    const data = await getEvents();
    return data;
});
