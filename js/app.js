import '../styles/main.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import App from "../views/index.js";

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('app')
);