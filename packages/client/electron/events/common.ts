import { WINDOW_EVENTS } from "../constants/events";
import { BrowserWindow, dialog, ipcMain, screen, app } from "electron";
import * as fs from "fs";
import { buildURL } from "../utils";

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

const makeNewWindow = (
  atPath = "",
  options: NWOpen,
  __dirname: string,
  transparent: boolean
) => {
  const DEFAULTS: Electron.BrowserWindowConstructorOptions = {
    width: options.width,
    height: options.height,
    frame: false,
    transparent,
    x: options.x,
    y: options.y,
    alwaysOnTop: options.onTop,
    webPreferences: {
      // allowRunningInsecureContent: true,
      nodeIntegration: true,
      contextIsolation: false,
    },
  };
  let mainWindow: BrowserWindow;
  mainWindow = new BrowserWindow({
    ...DEFAULTS,
  });

  // const menu = Menu.buildFromTemplate(menuTemplate);
  // Menu.setApplicationMenu(menu);
  mainWindow.loadURL(buildURL(atPath));
  return mainWindow;
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
    const window = BrowserWindow.fromWebContents(event.sender);
    window.close();
    // mainWindow.close();
  });
}

export default common;
