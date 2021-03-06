import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {BrowserRouter} from 'react-router-dom';

// Importing the Bootstrap CSS
import 'bootswatch/dist/darkly/bootstrap.min.css';

// import React-grid-layout css
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'


ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
                <App/>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
