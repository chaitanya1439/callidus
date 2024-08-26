import { useState } from 'react';
import Image from 'next/image';
import axios from 'axios'; // Add axios

type CartItem = {
  id: number;
  name: string;
  imageSrc: string;
  rating: number;
  price: number;
  quantity: number;
};

const foodItems: CartItem[] = [
  {
    id: 1,
    name: 'Burger',
    imageSrc: '/img3.jpeg',
    rating: 4.5,
    price: 8.99,
    quantity: 0,  
  },
  {
    id: 2,
    name: 'Pizza',
    imageSrc: '/img3.jpeg',
    rating: 4.7,
    price: 12.99,
    quantity: 0,  
  },
  {
    id: 3,
    name: 'Pasta',
    imageSrc: '/img3.jpeg',
    rating: 4.3,
    price: 10.99,
    quantity: 0,  
  },
];

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const BACKEND_URL = "http://localhost:3001"; 

  const handleAddToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        );
      }
      return prevCart.filter((cartItem) => cartItem.id !== item.id);
    });
  };

  const handleCheckout = async () => {
    try {
      // Convert cart to order data format
      const orderData = cart.map(item => ({
        menuItemId: item.id,
        quantity: item.quantity,
      }));

      // Send order to the backend
      const response = await axios.post(`${BACKEND_URL}/v1/order/create`, { items: orderData });
      console.log('Order created:', response.data);
      alert('Order created successfully!');
      setCart([]); // Clear the cart
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Failed to create order.');
    }
  };

  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {foodItems.map((item) => (
          <div key={item.id} className="border rounded-lg p-4 shadow-lg">
            <Image
              src={item.imageSrc}
              alt={item.name}
              width={400}
              height={250}
              className="rounded-lg"
              fetchPriority="high"
            />
            <h2 className="text-xl font-semibold mt-4">{item.name}</h2>
            <p className="mt-2 text-gray-600">Rating: {item.rating} ⭐️</p>
            <p className="mt-2 text-gray-800 font-bold">${item.price.toFixed(2)}</p>
            <div className="flex items-center justify-between mt-4">
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
                onClick={() => handleAddToCart(item)}
              >
                +
              </button>
              <span className="mx-4 text-gray-800">
                {cart.find((cartItem) => cartItem.id === item.id)?.quantity || 0}
              </span>
              <button
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300"
                onClick={() => handleRemoveFromCart(item)}
                disabled={!cart.find((cartItem) => cartItem.id === item.id)}
              >
                -
              </button>
            </div>
          </div>
        ))}
      </div>
      {cart.length > 0 && (
        <>
          <div className="mt-6 text-xl font-semibold">
            Total: ${totalAmount.toFixed(2)}
          </div>
          <button
            className="mt-6 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300"
            onClick={handleCheckout}
          >
            Checkout
          </button>
        </>
      )}
    </div>
  );
}
