import { useState } from 'react';
import { products } from './data';

export default function DessertCart() {
 const [cart, setCart] = useState({})
 const [showModal, setShowModal] = useState(false)
 
 const addToCart = (product)=> {
  setCart((prev) => ({...prev, [product.id] : (prev[product.id] || 0) +1}))
 }
 
 const decreaseQty = (id)=> {
  setCart((prev)=> {
    const newQty = prev[id]-1
    if (newQty <= 0){
      const newCart = {...prev}
      delete newCart [id]
      return newCart
    }
    return{
      ...prev,
      [id]: newQty
    }
  })
 }

 const confirmOrder =()=>{
  setShowModal=(true)
 }
 const closeModal =()=>{
  setShowModal=(false)
  setCart({})
 }
 const totalItems = Object.values(cart).reduce((a,b) => a+b, 0)
 const totalCost = Object.values(cart).reduce((sum, [id, qty]) => {
   const item = products.find(p => p.id == id);
    return sum + item.price * qty;
 },0)
  return(
    <div className='p-6 bg-[#fff9f5] min-h-screen'>
      <h1 className="text-3xl font-bold mb-6">Desserts</h1>
      <div className="flex flex-col-reverse lg:flex-row gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 flex-1">
          {products.map(product => (
            <div key={product.id} className={`border rounded-2xl p-3 ${cart[product.id] ? 'border-orange-500' : 'border-transparent'} bg-white shadow-sm`}>
              <img src={product.image} alt={product.name} className='rounded-xl h-40 w-full object-cover mb-3'/>
              <h3 className='text-md font-semibold'>{product.name}</h3>
              <p className="text-sm text-gray-600">${product.price.toFixed(2)}</p>
              {cart[product.id] ? (
                <div className='flex itms-center justify-between mt-2 '>
                  <button onClick={()=> decreaseQty(product.id)} className='bg-gray-300 px-3 py-1 rounded'>-</button>
                <span className='text-orange-500 font-semibold'>{cart[product.id]}</span>
                    <button onClick={() => addToCart(product)} className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded">+</button>
                </div>
              ) : ( 
                <button className='mt-2 w-full bg-white border hover:bg-gray-100 px-4 py-2 rounded ' onClick={()=> addToCart(product)}>Add to Cart </button>
              )}
            </div>
           ))}
        </div>

        <div className="lg:max-w-sm w-full bg-white rounded-2xl p-6 shadow-lg">
          <h2 className='capitalize text-xl font-bold mb-4 '>your cart</h2>
           {Object.entries(cart).map(([id, qty]) => {
              const item = products.find(p => p.id == id);
              return (
                <div key={id} className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-gray-500">{qty} x ${item.price.toFixed(2)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">${(item.price * qty).toFixed(2)}</p>
                    <button onClick={() => decreaseQty(id)} className="text-xs text-red-500">✕</button>
                  </div>
                </div>
              );
            })}
        </div>
         <div className="mt-4 border-t pt-4 text-lg font-bold text-right">${totalCost.toFixed(2)}</div>
          <div className="mt-2 text-xs text-green-700">✅ This is a <strong>carbon-neutral</strong> delivery</div>
          <button className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded" onClick={confirmOrder}>Confirm Order</button>
      </div>
    </div>
  );
}
