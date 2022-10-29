import React from 'react'
import "../App.css"
const Product = ({product}) => {
  return (
    <div style={{ width: '33%' }}>
        <div className='product-item' id={product.id}>
            <img src={product.url} width="100%" />
            <p>{product.name} | {product.category} </p>
            <p> {product.seller} </p>
            <p> Rs. {product.price} /-</p>
            <button>Add To Cart</button>
            
        </div>
    </div>
  )
}

export default Product
