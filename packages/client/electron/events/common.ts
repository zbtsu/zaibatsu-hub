import { WINDOW_EVENTS } from "../constants/events";
import { dialog, ipcMain, screen, app } from "electron";
import { BrowserWindow, setVibrancy, Vibrancy } from "electron-acrylic-window";
import * as fs from "fs";
import { buildURL, makeVibrancy } from "../utils";

function percentage(num: number, per: number) {
  return (num / 100) * per;
}

type NWOpen = {
  x: number;
  y: number;
  width: number;
  height: number;
  onTop: boolean;
};

function common(mainWindow: BrowserWindow, __dirname: string) {
  ipcMain.on(WINDOW_EVENTS.DO_MINIMIZE, (event) => {
    const window = BrowserWindow.fromId(event.frameId);
    window.minimize();
  });
  ipcMain.on(WINDOW_EVENTS.DO_MAXIMIZE, (event) => {
    const window = BrowserWindow.fromId(event.frameId);
    if (window.isMaximized()) {
      return window.restore();
    }
    return window.maximize();
  });
  ipcMain.on(WINDOW_EVENTS.DO_CLOSE, (event) => {
    console.log("trying to close");
    const window = BrowserWindow.fromWebContents(event.sender);
    window.close();
    // mainWindow.close();
  });
  ipcMain.on(WINDOW_EVENTS.SET_THEME, (event, theme: "light" | "dark") => {
    setVibrancy(mainWindow, makeVibrancy(theme));
  });
}

export default common;
