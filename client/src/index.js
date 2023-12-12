import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {setUpStorage} from "./redux";
import {Provider} from "react-redux";

const root = ReactDOM.createRoot(document.getElementById('root'));
const storage = setUpStorage()
root.render(
    <Provider store={storage}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
    </Provider>
);