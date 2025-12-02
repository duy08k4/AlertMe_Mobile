import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { store } from './redux/store';
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify';
import { webSocketManagerAlert } from './websocket/socketToAlert';
import { webSocketManagerTracking } from './websocket/socketToTracking';

import { defineCustomElements } from '@ionic/pwa-elements/loader';

// Connect to websocket
webSocketManagerAlert.connect();
webSocketManagerTracking.connect();

// Call the element loader before the bootstrapModule/bootstrapApplication call.
defineCustomElements(window);

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  // <React.StrictMode>
    <Provider store={store}>
      <App />
      <ToastContainer />
    </Provider>
  // </React.StrictMode>
);