import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
// import TicTacToe from "./TicTacToe";
// import Sandbox from "./Sandbox";
import Keybr from "./Keybr"
import Users from "./Users"

ReactDOM.render(
  <React.StrictMode>
    {/*<Sandbox name={"Louis"} />*/}
    {/*<App/>*/}
    {/*<TicTacToe/>*/}
    <Keybr/>
    {/*<Users/>*/}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
