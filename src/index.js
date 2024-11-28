// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { register } from './serviceWorker';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

register();
