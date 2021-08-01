import { ipcRenderer } from "electron";

const sendEvent = (eventName: string, ...args: any[]) => {
  ipcRenderer.send(eventName, ...args);
};

export default sendEvent;
