import { createRoot } from 'react-dom/client';
import Layout from './layout/Layout.jsx';
import { OoxiosRequestControl } from '../js/Requestor.js';
import React from 'react';

// Attach React app with reactRender routes
const appRoot = createRoot(document.querySelector('#app'));
appRoot.render(
  <Layout />
);

// Initialise Requestor wrapper
window.ooxios = new OoxiosRequestControl();