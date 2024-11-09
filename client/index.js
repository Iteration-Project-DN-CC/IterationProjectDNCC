import React from 'react';

import { createRoot } from 'react-dom/client';

import App from './App.jsx'; // Assuming your root component is in App.js

const domNode = document.getElementById('root');
const root = createRoot(domNode);
root.render(<App />);
