import { ipcRenderer } from "electron";
import { useEffect } from "react";
import { WINDOW_EVENTS } from "../constants/events";

export const useVibrancyService = (theme: "light" | "dark") => {
  useEffect(() => {
    ipcRenderer.send(WINDOW_EVENTS.SET_THEME, theme);
  }, [theme]);
};
