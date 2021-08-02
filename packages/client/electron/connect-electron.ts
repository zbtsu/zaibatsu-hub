import * as childProcess from "child_process";
import * as net from "net";
import waitOn from "wait-on";

var portInUse = function (
  port: number,
  callback: (returnValue: boolean) => any
) {
  var server = net.createServer(function (socket) {
    socket.write("Echo server\r\n");
    socket.pipe(socket);
  });

  server.on("error", function () {
    callback(true);
  });
  server.on("listening", function () {
    server.close();
    callback(false);
  });

  server.listen(port, "127.0.0.1");
};

// Adjust port so that Electron hits React
const port: number = process.env.PORT
  ? Number.parseInt(process.env.PORT, 10) - 100
  : 5000;

process.env.ELECTRON_START_URL = `http://localhost:${port}`;
let isLive = false;

const tryConnection = () => {
  console.log("starting");
  if (!isLive) {
    const child = childProcess.exec(
      'nodemon --watch "build"  --exec "electron ." --inspect=5858',
      {
        windowsHide: true,
      }
    );
    isLive = true;
    child?.stdout?.pipe(process?.stdout);
    child?.stderr?.pipe(process?.stderr);
  }
};

portInUse(5858, (isPortInUse) => {
  isLive = isPortInUse;
});

waitOn({
  resources: [process.env.ELECTRON_START_URL],
  simultaneous: 1,
}).then(tryConnection);
