import { ipcRenderer } from "electron";
import React, { useCallback } from "react";
import { WINDOW_EVENTS } from "../constants/events";

export const useMaximized = () => {
  const [state, setState] = React.useState(false);
  const maxListener = useCallback(
    (event) => {
      setState(true);
    },
    [setState]
  );
  const minListener = useCallback(
    (event) => {
      setState(false);
    },
    [setState]
  );
  React.useEffect(() => {
    ipcRenderer.on(WINDOW_EVENTS.ON_MAXIMIZE, maxListener);
    ipcRenderer.on(WINDOW_EVENTS.ON_MINIMIZE, minListener);
    return () => {
      ipcRenderer.on(WINDOW_EVENTS.ON_MAXIMIZE, maxListener);
      ipcRenderer.on(WINDOW_EVENTS.ON_MINIMIZE, minListener);
    };
  }, [maxListener, minListener]);
  return state;
};
