import React, { useState } from 'react';
import Link from 'next/link';
import { FaHome, FaTags, FaStar, FaFire, FaMusic, FaBook } from 'react-icons/fa';
import { HiX } from 'react-icons/hi';



const Slidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleSidebar}
        className="p-4 bg-gray-800 text-white  rounded-md"
        aria-label="Toggle Sidebar"
      >
        ☰
      </button>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-gray-800 bg-opacity-50 z-40 ${
          isOpen ? 'block' : 'hidden'
        }`}
        onClick={toggleSidebar}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 w-64 bg-white h-full shadow-md z-50 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out`}
        role="navigation"
        aria-label="Sidebar Menu"
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold">Menu</h2>
          <button
            onClick={toggleSidebar}
            className="p-2 text-gray-600 hover:text-black"
            aria-label="Close Sidebar"
          >
            <HiX className="text-2xl" />
          </button>
        </div>
        <div className="p-4">
          <ul>
            <li className="flex items-center mb-2">
              <FaHome className="text-gray-600 mr-2" />
              <Link href="/" className="text-gray-700">Home</Link>
            </li>
            <li className="flex items-center mb-2">
              <FaFire className="text-gray-600 mr-2" />
              <Link href="/trending" className="text-gray-700">Trending</Link>
            </li>
            <li className="flex items-center mb-2">
              <FaStar className="text-gray-600 mr-2" />
              <Link href="/bestsellers" className="text-gray-700">Best Sellers</Link>
            </li>
            <li className="flex items-center mb-2">
              <FaTags className="text-gray-600 mr-2" />
              <Link href="/deals" className="text-gray-700">Today&#39;s Deals</Link>
            </li>
            <li className="flex items-center mb-2">
              <FaMusic className="text-gray-600 mr-2" />
              <Link href="/digital-content" className="text-gray-700">Digital Content</Link>
            </li>
            <li className="flex items-center mb-2">
              <FaBook className="text-gray-600 mr-2" />
              <Link href="/kindle" className="text-gray-700">Kindle E-readers</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Slidebar;
