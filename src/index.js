import React from 'react';
import ReactDOM from 'react-dom/client';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import firebase from 'firebase/compat/app';
import "firebase/compat/firestore";
import { MetamaskStore } from './context/metamask';

import { Home, Product, Products, AboutPage, ContactPage, Cart, Login, Register, Checkout, PageNotFound, PostForm } from "./pages"

const firebaseConfig = {
  apiKey: "AIzaSyAWgLmjAg6YJUsZr6kiwE76eybG5DLnexc",
  authDomain: "optimum-f9baf.firebaseapp.com",
  projectId: "optimum-f9baf",
  storageBucket: "optimum-f9baf.appspot.com",
  messagingSenderId: "752693354573",
  appId: "1:752693354573:web:8c66bd426b5f7c47ebfc04"
}

const app = firebase.initializeApp(firebaseConfig);

var db = app.firestore();


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <MetamaskStore>
  <BrowserRouter>
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Products />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/post" element={<PostForm />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/product/*" element={<PageNotFound />} />
      </Routes>
    </Provider>
  </BrowserRouter>
  </MetamaskStore>
);


export {db}