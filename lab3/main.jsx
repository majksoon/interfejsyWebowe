import React from "react";
import { createRoot } from "react-dom/client";
import "./app/app.css";
import App from "./app/root.jsx";

const root = createRoot(document.getElementById("root"));
root.render(<App />);
