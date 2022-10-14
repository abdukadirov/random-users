import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "./global.scss"
import 'bootstrap/dist/css/bootstrap.min.css';
import {library} from '@fortawesome/fontawesome-svg-core'
import {fas} from '@fortawesome/free-solid-svg-icons'
import {Provider} from "react-redux";
import stores from "./reducers/index.js";
import thunk from "redux-thunk";
import {applyMiddleware, compose, createStore} from "redux";
library.add(fas)
const store = createStore(stores, compose(applyMiddleware(thunk)));
store.subscribe(() => console.log("[DISPATCH]: ", store.getState()))
ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);




