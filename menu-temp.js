const electron = require("electron");
const { app } = electron;

const createAddWindow = require("./add");

// Create menu template
const createMenuTemplate = [
  {
    label: "File",
    submenu: [
      {
        label: "Add Item",
        accelerator: process.platform === "darwin" ? "Shift+A" : "Shift+A",
        click() {
          createAddWindow();
        },
      },
      {
        label: "Clear Items",
        click() {
          mainWindow.webContents.send("item:clear");
        },
      },
      {
        label: "Quit",
        accelerator: process.platform === "darwin" ? "Cmd+Q" : "Ctrl+Q",
        click() {
          app.quit();
        },
      },
    ],
  },
];

// If mac add empty object to menu
if (process.platform === "darwin") {
  createMenuTemplate.unshift({});
}

// Add developer tools if not in production
if (process.env.NODE_ENV !== "production") {
  createMenuTemplate.push({
    label: "Developer Tools",
    submenu: [
      {
        label: "Toggle DevTools",
        accelerator: process.platform === "darwin" ? "command+I" : "Ctrl+I",
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools();
        },
      },
      {
        role: "reload",
      },
    ],
  });
}

module.exports = () => createMenuTemplate;
