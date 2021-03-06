const electron = require("electron");
const { ipcRenderer } = electron;

const form = document.querySelector("form");
const close = document.querySelector(".close-btn");
const editfield = document.querySelector(".editfield");

let editedField;


ipcRenderer.send("edit:opened");

ipcRenderer.on("updateitem", (e, item) => {
  editfield.value = item.description;
  editedField = item;
});


const submitForm = function (e) {
  e.preventDefault();
  const item = document.querySelector("#item").value;
  editedField.description = item;
  ipcRenderer.send("edit:closed");
  ipcRenderer.send("item:edit", editedField);
};

form.addEventListener("submit", submitForm);

close.addEventListener("click", () => {
  ipcRenderer.send("edit:closed");
  window.closeWindow();
});
