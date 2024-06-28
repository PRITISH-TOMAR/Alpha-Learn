import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider}from "react-redux"
import {persistor, store} from './Components/Redux/Store'
import { PersistGate } from 'redux-persist/integration/react'

// import { ThemeProvider } from './Components/Theme/ThemeProvider'
import ThemeProvider from "./Components/Theme/ThemeProvider";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <PersistGate persistor={persistor}>

     <Provider store = {store}>

    <ThemeProvider>

      <App />
    </ThemeProvider>

     </Provider>
    </PersistGate>
  </React.StrictMode>,
);
