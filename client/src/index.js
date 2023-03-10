import React from 'react';
import ReactDOM from 'react-dom/client';
import './reset.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from './components/Context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
    // set up router and context provider
    <BrowserRouter>
      <Provider>
        <App />
      </Provider>
    </BrowserRouter>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
