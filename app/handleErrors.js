const { app, dialog } = require("electron");

function relaunchApp(win) {
  dialog.showMessageBox(
    win,
    {
      type: "error",
      title: "VerSystem",
      message: "Ocurrió un error inesperado, se reiniciará el sistema",
    },
    () => {
      app.relaunch(1);
      app.exit(1);
    }
  );
}

function setupErrors(win) {
  win.webContents.on("crashed", () => {
    relaunchApp(win);
  });

  win.on("unresponsive", () => {
    dialog.showMessageBox(win, {
      type: "warning",
      title: "VerSystem",
      message:
        "Un proceso está tardando demasiado, puede esperar o reiniciar el sistema manualmente",
    });
  });

  process.on("exit", () => {
    app.quit();
  });

  process.on("uncaughtException", (err) => {
    relaunchApp(win);
  });
}

module.exports = setupErrors;
