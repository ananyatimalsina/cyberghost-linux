import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./main.css";
import backgroundImage from './assets/CompactBackground.png';

document.body.style.backgroundImage = `url(${backgroundImage})`;
window.ondragstart = function() { return false; } 
// document.addEventListener('contextmenu', event => event.preventDefault());

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
