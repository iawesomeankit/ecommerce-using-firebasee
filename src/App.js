import './App.css';
import { useEffect, useState } from 'react';
import Navbar from "./components/Navbar"
import ProductList from "./components/ProductList"
import { Routes, Route } from "react-router-dom";
import { UserAuthContextProvider } from './config/firebase-config';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Cart from './components/Cart';
function App() {

  return (
    <div className="App">
        <UserAuthContextProvider>
          <Routes>
              {/* <Route path="/" element={<Navbar/>}/> */}
              <Route path="/" element={<ProductList/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/signup" element={<SignUp/>}/>
              <Route path="/cart" element={<Cart/>}/>
          </Routes>
        </UserAuthContextProvider>
    </div>
  );
}

export default App;
