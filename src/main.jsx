import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App/App.jsx";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);
