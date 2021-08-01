import { app, BrowserWindow, dialog, screen, Rectangle } from "electron";
import * as events from "./events";
import * as Store from "electron-store";
import { buildURL } from "./utils";
// import * as vibrancy from "electron-vibrancy";

process.env.NODE_ENV = process.env.NODE_ENV || "production";

// try {
//   const remote = require("@electron/remote/main");
//   remote.initialize();
// } catch (e) {
//   console.error(e);
// }

const store = new Store();

let mainWindow: BrowserWindow | null;

const DIMENSIONS = {
  W: 1280,
  H: 720,
};
const DEFAULTS: Electron.BrowserWindowConstructorOptions = {
  width: DIMENSIONS.W,
  height: DIMENSIONS.H,
  frame: false,
  minHeight: 720,
  minWidth: 1100,
  // transparent: true,
  webPreferences: {
    allowRunningInsecureContent: false,
    nodeIntegration: true,
    contextIsolation: false,
    nativeWindowOpen: true,
    devTools: true,
  },
};

function createWindow() {
  const winBounds = store.get<string>("winBounds") as {
    bounds: any;
    isMaximised: boolean;
  };
  const options: Electron.BrowserWindowConstructorOptions = Object.assign(
    { ...DEFAULTS },
    { ...winBounds.bounds }
  );
  let mainWindow: BrowserWindow;
  mainWindow = new BrowserWindow({
    ...options,
  });

  mainWindow.loadURL(buildURL(""));

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
  mainWindow.on("resized", () => {
    store.set("winBounds", {
      bounds: mainWindow.getBounds(),
      maximized: mainWindow.isMaximized() || mainWindow.isFullScreen(),
    });
  });
  mainWindow.on("maximize", () => {
    store.set("winBounds", {
      bounds: mainWindow.getBounds(),
      maximized: mainWindow.isMaximized() || mainWindow.isFullScreen(),
    });
  });

  mainWindow.on("moved", () => {
    store.set("winBounds", {
      bounds: mainWindow.getBounds(),
      maximized: mainWindow.isMaximized() || mainWindow.isFullScreen(),
    });
  });

  mainWindow.on("close", () => {
    store.set("winBounds", {
      bounds: mainWindow.getBounds(),
      maximized: mainWindow.isMaximized() || mainWindow.isFullScreen(),
    });
    mainWindow = null;
  });

  events.common(mainWindow, __dirname);
  // events.updates(mainWindow, __dirname);
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.setAsDefaultProtocolClient("zaibatsu");

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

if (process.env.NODE_ENV === "development") {
  const devtools = require("electron-devtools-installer");
  const installExtension = devtools.default;
  const { REDUX_DEVTOOLS, REACT_DEVELOPER_TOOLS } = devtools;
  app.whenReady().then(() => {
    installExtension([REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS])
      .then((name: any) => console.log(`Added Extension:  ${name}`))
      .catch((err: any) => console.log("An error occurred: ", err));
  });
}
