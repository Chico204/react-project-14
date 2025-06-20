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

const confirmOrder = () => {
    setShowModal(true);
  };
 const closeModal =()=>{
  setShowModal(false)
  setCart({})
 }
 const totalItems = Object.values(cart).reduce((a,b) => a+b, 0)
 const totalCost = Object.entries(cart).reduce((sum, [id, qty]) => {
   const item = products.find(p => p.id == id);
    return sum + item.price * qty;
 },0)
  return(
       <div className="p-6 bg-[#fff9f5] min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Desserts</h1>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 flex-1">
          {products.map(product => (
            <div key={product.id} className={`border rounded-2xl p-3 ${cart[product.id] ? 'border-orange-500' : 'border-transparent'} bg-white shadow-sm `}>
              <img src={product.image} alt={product.name} className="rounded-xl h-50 w-full object-cover mb-3" />
              <h3 className=" font-semibold">{product.name}</h3>
              <p className="text-xl text-orange-600 font-semibold">${product.price.toFixed(2)}</p>
              <div className=' flex justify-center'>
              {cart[product.id] ? (
                <div className="flex items-center justify-between mt-2 bg-orange-600 rounded-full p-1 relative top-7 w-50 cursor-pointer">
                  <button onClick={() => decreaseQty(product.id)} className="bg-orange-600 px-3 py-1 border-1  rounded-full text-white">−</button>
                  <span className="text-white font-semibold">{cart[product.id]}</span>
                  <button onClick={() => addToCart(product)} className="bg-orange-600 border-1  text-white px-3 py-1 rounded-full">+</button>
                </div>
              ) : (
                <button className="add mt-2  bg-white border hover:bg-gray-100 px-4 py-2 rounded-full font-bold relative top-7  w-50 cursor-pointer" onClick={() => addToCart(product)}>
                 Add to Cart
                </button>
              )}</div>
            </div>
          ))}
        </div>

        <div className="lg:max-w-sm w-full bg-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-bold mb-4 text-orange-600">Your Cart ({totalItems})</h2>
          <div className="space-y-2">
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
          <div className="mt-2 text-xs text-green-700 bg-[#fff9f5] p-1 flex justify-center">✅ This is a <strong> carbon-neutral</strong> delivery</div>
          <button className="mt-4 w-full bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-full font-semibold cursor-pointer" onClick={confirmOrder}>Confirm Order</button>
        </div>
      </div>

      {showModal && (
  <div className="fixed inset-0 flex items-center justify-center bg-[#5149455d] bg-opacity-40 z-50">
    <div className="bg-white rounded-xl p-8 shadow-lg max-w-md w-full text-center">
      <h2 className="text-2xl font-bold mb-4 flex justify-start">🎉 Order Confirmed!</h2>
      <p className="text-gray-600 mb-6 text-left">We hope you enjoy your food</p>
      <div className="mb-4 max-h-48 overflow-y-auto bg-[#fff9f5] p-1">
        {Object.entries(cart).map(([id, qty]) => {
          const item = products.find(p => p.id == id);
          return (
            <div key={id} className="flex items-center mb-3">
              <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover mr-4" />
              <div className="text-left flex-1">
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-gray-500"> <span className='text-orange-600 font-bold'>{qty} x</span> ${item.price.toFixed(2)}</p>
              </div>
              <div className="font-semibold ">${(item.price * qty).toFixed(2)}</div>
            </div>
          );
        })}
      </div>
      <p className="text-lg font-semibold mb-6 flex justify-between"><span className='text-sm  text-gray-600'>Order Total</span> ${totalCost.toFixed(2)}</p>
      
      <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-full w-full cursor-pointer" onClick={closeModal}>Start New Order</button>
    </div>
  </div>
)}

    </div>

  );
}
