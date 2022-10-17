import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Main from './main';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { createTheme, ThemeProvider } from "@mui/material/styles";

function Page() {
  // const userid = localStorage.getItem("userid");
    return (
      <BrowserRouter>
        <Routes>
          <Route path={"/*"} element={<Navigate replace to={"/main"} />} />
          <Route path={"/main"} element={<Main/>} />
        </Routes>
      </BrowserRouter>
    );
}

const theme = createTheme();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme = {theme}>
      <Page />
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
