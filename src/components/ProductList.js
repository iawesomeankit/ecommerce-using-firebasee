import React,{useState} from 'react'
import '../App.css';
import {item} from "../data"
import Navbar from './Navbar';
import {useUserAuth } from "../config/firebase-config"

function ProductList() {
    const [listData,setListData] = useState(item);
    const [items,setItems] = useState("");
    const {user,addToCart} = useUserAuth();
    const handleAdd= async (product)=>{
        const index = items.indexOf(product);
        console.log(index);
        var flag = false;
        if(!flag){
            await addToCart(product);  
            setItems([...items],product);
        }
    }
  return (
    <>
        <Navbar/>
        {user?
    <div className='flex'>
        {
            
            listData.map((product,id)=>
            <div style={{display:"flex",justifyContent:"center",alignItems:"center",textAlign:"center"}}>
                <div className='product-item' id={product.id}>
                    <img src={product.url} width="100%" />
                    <p>{product.name} | {product.category} </p>
                    <p> {product.seller} </p>
                    <p> Rs. {product.price} /-</p>
                    <button style={{marginBottom:"20px"}} onClick={()=>{handleAdd(product)}}>Add To Cart</button>
                </div>
                </div>
            )
        }
    </div>:<h3>Login to use the website</h3>}
    </>
  )
}

export default ProductList