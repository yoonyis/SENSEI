const { app, BrowserWindow } = require("electron");
const { exec } = require("child_process");

let viteProcess;
let serverProcess;

function startServices() {
  viteProcess = exec("npm run dev");
  serverProcess = exec("npm run server");

  viteProcess.stdout?.on("data", (data) => {
    console.log(`[VITE] ${data}`);
  });

  viteProcess.stderr?.on("data", (data) => {
    console.error(`[VITE] ${data}`);
  });

  serverProcess.stdout?.on("data", (data) => {
    console.log(`[SERVER] ${data}`);
  });

  serverProcess.stderr?.on("data", (data) => {
    console.error(`[SERVER] ${data}`);
  });
}

function createWindow() {
  const win = new BrowserWindow({
    width: 390,
    height: 844,

    resizable: false,
    autoHideMenuBar: true,

    backgroundColor: "#061111",

    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  const loadApp = () => {
    win.loadURL("http://localhost:5173").catch(() => {
      setTimeout(loadApp, 1000);
    });
  };

  loadApp();
}

app.whenReady().then(() => {
  startServices();

  setTimeout(() => {
    createWindow();
  }, 3000);
});

app.on("window-all-closed", () => {
  if (viteProcess) {
    viteProcess.kill();
  }

  if (serverProcess) {
    serverProcess.kill();
  }

  if (process.platform !== "darwin") {
    app.quit();
  }
});