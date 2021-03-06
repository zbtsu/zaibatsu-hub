import { app, nativeTheme } from "electron";
import { BrowserWindow } from "electron-acrylic-window";
import * as events from "./events";
import * as Store from "electron-store";
import { buildURL, makeVibrancy } from "./utils";
import { WINDOW_EVENTS } from "./constants/events";

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
  autoHideMenuBar: true,
  // transparent: true,
  vibrancy: makeVibrancy("light") as any,
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
    maximized: boolean;
  };
  const options: Electron.BrowserWindowConstructorOptions = Object.assign(
    { ...DEFAULTS },
    { ...winBounds.bounds }
  );
  let mainWindow: BrowserWindow;
  mainWindow = new BrowserWindow({
    ...options,
  });
  // if (winBounds.maximized) {
  //   mainWindow.maximize();
  // }
  const setWindowBounds = () => {
    if (!mainWindow) return;
    const maximized = mainWindow.isMaximized() || mainWindow.isFullScreen();
    const bounds = mainWindow.getBounds();
    const boundsObj = {
      bounds,
      maximized,
    };
    console.log({ boundsObj });
    store.set("winBounds", boundsObj);
  };
  mainWindow.loadURL(buildURL(""));

  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  mainWindow.on("resized", () => {
    setWindowBounds();
  });
  mainWindow.webContents.on("did-create-window", (childWindow) => {
    // For example...
  });
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    return {
      action: "allow",
      overrideBrowserWindowOptions: {
        frame: true,
      },
    };
  });
  mainWindow.on("maximize", () => {
    mainWindow.webContents.send(
      WINDOW_EVENTS.ON_MAXIMIZE,
      mainWindow.isMaximized()
    );
    setWindowBounds();
  });

  mainWindow.on("unmaximize", () => {
    mainWindow.webContents.send(
      WINDOW_EVENTS.ON_MINIMIZE,
      mainWindow.isMaximized()
    );
    setWindowBounds();
  });

  mainWindow.on("moved", () => {});

  mainWindow.on("close", () => {
    setWindowBounds();

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
app.requestSingleInstanceLock();

app.on("open-url", function (event, url) {
  event.preventDefault();
  console.log({ event, url });
});

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
