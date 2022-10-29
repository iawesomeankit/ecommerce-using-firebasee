import '../App.css';
import { useState,useEffect } from 'react';
import { Link} from 'react-router-dom';
import { useNavigate } from "react-router";
import "./navbar.css"
import {useUserAuth } from "../config/firebase-config"
function Navbar() {
  const [carts,setCarts] = useState("");
  const navigate = useNavigate();
const {user,logOut,getAllCart} = useUserAuth();
const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getCart();
  },[carts]);
  const getCart = async () => {
    const data = await getAllCart();
    console.log(data.docs);
    setCarts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  // getCart();
    return (
    <>
    {
        user?
        <div className='navbar'>
            <div className='heading'><h3>Shopping Cart App</h3></div>
            <div className='auth'>
                    <h3>{user.email}</h3>
                    <Link to="/cart">
                    <h3>cart<sup>{carts.length}</sup></h3>

                    </Link>
                    <button onClick={handleLogout}>
                    logout
                    </button>
            </div>
        </div>:
       
<div className='navbar'>
            <Link to="/">
            <div className='heading'><h3>Shopping Cart App</h3></div>
            </Link>
                <div className='auth'>
                <Link to="/login">
                <h3>Login</h3>
                </Link>
                <Link to="/signup">
                <h3>Signup</h3>
                </Link>
            </div>
        </div>
}
    </>
    );
}

export default Navbar;
