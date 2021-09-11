import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {OTOI} from "./OTOI.js";
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <OTOI />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);


reportWebVitals();
