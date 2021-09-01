import { format } from "url";
import { join } from "path";
import { Vibrancy } from "electron-acrylic-window";

export const buildURL = (atPath: string) =>
  process.env.ELECTRON_START_URL
    ? `${process.env.ELECTRON_START_URL}/#${atPath}`
    : format({
        pathname: join(__dirname, "../../index.html"),
        hash: `${atPath}`,
        slashes: true,
        protocol: "file:",
      });

export const makeVibrancy = (theme: "light" | "dark"): Vibrancy => {
  return {
    theme: theme === "dark" ? "#15151500" : "#ffffff00",
    effect: "blur",
    useCustomWindowRefreshMethod: true,
    disableOnBlur: true,
    debug: false,
  };
};
