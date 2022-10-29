import React,{useEffect,useState} from 'react'
import { Link } from 'react-router-dom';
import {useUserAuth } from "../config/firebase-config"
import Navbar from './Navbar';
const Cart = () => {
  const [carts,setCarts] = useState([]);
  const [tprice,setTprice] = useState(0);
  const {getAllCart,getCart,updateCart,deleteCart} = useUserAuth();
  useEffect(() => {
    getCarts();
  },[]);
  const getCarts = async () => {
    const data = await getAllCart();
    console.log(data.docs);
    setCarts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  // getCart();
  const addQuantity = async(id)=>{
    const car =  await getCart(id);
    console.log(car.data());
    // console.log(car.data());
    const ucart = car.data();
    ucart.quantity=ucart.quantity+1;
    await updateCart(id,ucart);
    getCarts();
  }
  const removeQuantity = async (id)=>{
    const car = await getCart(id);
    console.log(car.data());
    const ucart = car.data();
    ucart.quantity=ucart.quantity-1;
    if(ucart.quantity>=1){
      await updateCart(id,ucart);
    }
    else{
      await deleteCart(id);
    }
    getCarts();
  }

  return (
    <>
    <Navbar/>
    <Link to="/">
      go back
    </Link>
    <h1>Tota price is :{carts.reduce((total,item)=>total+(item.price*item.quantity),0)}</h1>
    <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center",alignItems:"center",textAlign:"center"}}>
      {carts.map((item)=>
      <div>
      <div className='product-item'>
          <img src={item.url} width="100%" />
          <p>{item.name} | {item.category} </p>
          <p> {item.seller} </p>
          <p> Rs. {item.price} /-</p>
          <p> Quantity: {item.quantity}</p>
          <button onClick={()=>addQuantity(item.id)}>+</button>
          <button onClick={()=>removeQuantity(item.id)}>-</button>
      </div>
  </div>
      )}
    </div>
    </>
  )
}

export default Cart
