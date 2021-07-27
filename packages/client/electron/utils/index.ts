import { format } from "url";
import { join } from "path";

export const buildURL = (atPath: string) =>
  process.env.ELECTRON_START_URL
    ? `${process.env.ELECTRON_START_URL}/#${atPath}`
    : format({
        pathname: join(__dirname, "../index.html"),
        hash: `${atPath}`,
        slashes: true,
        protocol: "file:",
      });
