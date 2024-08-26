import { useState } from 'react';
import Image from 'next/image';

type FoodItem = {
  id: number;
  name: string;
  imageSrc: string;
  rating: number;
  price: number;
};

const foodItems: FoodItem[] = [
  {
    id: 1,
    name: 'Burger',
    imageSrc: '/img3.jpeg',
    rating: 4.5,
    price: 8.99,
  },
  {
    id: 2,
    name: 'Pizza',
    imageSrc: '/img3.jpeg',
    rating: 4.7,
    price: 12.99,
  },
  {
    id: 3,
    name: 'Pasta',
    imageSrc: '/img3.jpeg',
    rating: 4.3,
    price: 10.99,
  },
];

export default function CartPage() {
  const [cart] = useState<FoodItem[]>(foodItems);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-950">Your Cart</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {cart.map((item) => (
          <div key={item.id} className="border rounded-lg p-4 shadow-lg">
            <div className="relative w-full h-64">
              <Image 
                src={item.imageSrc} 
                alt={item.name} 
                layout="fill" 
                objectFit="cover" 
                className="rounded-lg" 
                 fetchPriority="high"
              />
            </div>
            <h2 className="text-xl font-semibold mt-4 text-gray-950">{item.name}</h2>
            <p className="mt-2 text-gray-600">Rating: {item.rating} ⭐️</p>
            <p className="mt-2 text-gray-800 font-bold">₹{item.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
