import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {RegContextProvider} from '../src/context/Regcontext'
import {LogcontextProvider} from '../src/context/Logcontext'

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(

  <React.StrictMode>

    <RegContextProvider>

      <LogcontextProvider>

        <App />

      </LogcontextProvider>

    </RegContextProvider>


  </React.StrictMode>
);

