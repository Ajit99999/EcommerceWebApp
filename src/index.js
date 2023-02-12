import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';


import { BrowserRouter } from "react-router-dom";

import AppProvider from './context/App-context';
import AuthProvider from './context/Auth-context';
import CartProvider from './context/Cart-context';
const root = ReactDOM.createRoot(document.getElementById('root'));



root.render(
  // <React.StrictMode>
    <BrowserRouter>  
    <AuthProvider>   
    <AppProvider>   
      <CartProvider> 
      <App/>
      </CartProvider>
    </AppProvider>
    </AuthProvider>
    </BrowserRouter>

  // </React.StrictMode>
);


