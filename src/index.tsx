import React from 'react';
import './index.css';
import { createRoot } from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './app/App';
import {
  GlobalStyles, TTTravels, BluCurve, TriSpace, ComfortaFont,
} from './vendor';
import store from './store/store';

const rootDiv = document.getElementById('root');
const rootNode = createRoot(rootDiv as Element);

rootNode.render(
  <React.StrictMode>
    <Provider store={store}>

      <BrowserRouter>
        <GlobalStyles />
        <ComfortaFont />
        <TTTravels />
        <BluCurve />
        <TriSpace />
        <App />
      </BrowserRouter>

    </Provider>
  </React.StrictMode>,

);
