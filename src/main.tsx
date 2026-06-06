import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";

document.body.style.overflow = "hidden";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
