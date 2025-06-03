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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
