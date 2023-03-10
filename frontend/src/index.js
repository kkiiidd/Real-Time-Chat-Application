import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store/index';
// 引入 react-alert 的配置对象和Provider，由于名字冲突需要重命名 @kofeine 031023
import { positions, transitions, Provider as AlertProvider } from 'react-alert';
// 引入 react-alert 的模板 @kofeine 031023
import alertTemplate from 'react-alert-template-basic';
const root = ReactDOM.createRoot(document.getElementById('root'));
const options = {
  positions: positions.BOTTOM_CENTER,
  transitions: transitions.SCALE,
  timeout: 5000
}
root.render(
  <Provider store={store}>
    <AlertProvider template={alertTemplate} {...options} >
      <App />

    </AlertProvider>

  </Provider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
