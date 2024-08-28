import React, { useState } from 'react';
import Link from 'next/link';
import { MdHome, MdShoppingCart, MdPerson, MdFavorite, MdLogout } from 'react-icons/md';
import Slidebar from './slidebar';

const BottomNavbar: React.FC = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const BACKEND_URL = "http://localhost:3001"; 

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleLogout = async () => {
        try {
            await fetch(`${BACKEND_URL}/v1/user/logout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            // Redirect to login page or handle post-logout logic here
            window.location.href = '/login';
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white shadow-md md:hidden">
            <ul className="flex justify-around items-center py-2">
                <li>
                    <Link href="/home" passHref>
                        <div className="flex flex-col items-center text-sm hover:text-blue-500 transition duration-200 ease-in-out">
                            <MdHome className="h-6 w-6" />
                            <span>Home</span>
                        </div>
                    </Link>
                </li>
                <li>
                    <Link href="/cart" passHref>
                        <div className="flex flex-col items-center text-sm hover:text-blue-500 transition duration-200 ease-in-out">
                            <MdShoppingCart className="h-6 w-6" />
                            <span>Cart</span>
                        </div>
                    </Link>
                </li>
                <li>
                    <Link href="/favorites" passHref>
                        <div className="flex flex-col items-center text-sm hover:text-blue-500 transition duration-200 ease-in-out">
                            <MdFavorite className="h-6 w-6" />
                            <span>Favorites</span>
                        </div>
                    </Link>
                </li>
                <li>
                    <div className="relative">
                        <div className="flex flex-col items-center text-sm hover:text-blue-500 transition duration-200 ease-in-out cursor-pointer" onClick={toggleDropdown}>
                            <MdPerson className="h-6 w-6" />
                            <span>Profile</span>
                        </div>
                        {isDropdownOpen && (
                            <div className="absolute bottom-12 right-0 bg-gray-700 text-white p-2 rounded-lg shadow-lg">
                                <div className="flex items-center mb-2">
                                    <MdPerson className="h-5 w-5 mr-2" />
                                    <span className="text-sm">Your Name</span> {/* Replace with actual user's name */}
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center text-red-500 hover:text-red-600 transition duration-200 ease-in-out"
                                >
                                    <MdLogout className="h-5 w-5 mr-2" />
                                    <span className="text-sm">Logout</span>
                                </button>
                            </div>
                        )}
                    </div>
                </li>
                <li>
                    <div className="flex flex-col items-center text-sm hover:text-blue-500 transition duration-200 ease-in-out">
                        <Slidebar />
                    </div>
                </li>
            </ul>
        </nav>
    );
};

export default BottomNavbar;
