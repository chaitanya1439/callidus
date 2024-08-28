import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Slidebar from './slidebar';
import { MdShoppingCart, MdPerson, MdLocationOn, MdSearch, MdClose, MdNotifications, MdLogout } from 'react-icons/md';
import axios from 'axios';
import { useRouter } from 'next/router';

interface User {
    id: string;
    name: string;
    email?: string;
    // Add other user fields as necessary
}

const Navbar: React.FC = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    const BACKEND_URL = "http://localhost:3001"; 

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/v1/user/profile`);
                setUser(response.data);
            } catch (error) {
                console.error('Failed to fetch user profile:', error);
            }
        };

        fetchUserProfile();
    }, []);

    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
    };

    const handleLogout = async () => {
        try {
            await axios.post(`${BACKEND_URL}/v1/user/logout`);
            setUser(null);
            router.push('/login');
        } catch (error) {
            console.error('Failed to logout:', error);
        }
    };

    return (
        <div>
            <div className="bg-gray-100 flex items-center justify-between px-4 py-2 shadow-md">
                <div className={`flex items-center ${isSearchOpen ? 'hidden' : 'flex'} md:flex`}>
                    <div className="hidden md:block">
                        <Slidebar />
                    </div>
                    <div className="text-black font-bold text-2xl ml-2">
                        SHELTERIC
                    </div>
                </div>

                <div className="flex items-center flex-1 justify-center relative">
                    <input
                        type="text"
                        className={`w-full max-w-md px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-950 ${isSearchOpen ? 'block' : 'hidden md:block'}`}
                        placeholder="Search for products, brands, and more..."
                    />
                    <MdSearch
                        className={`absolute top-2 right-3 h-6 w-6 text-gray-950 hover:text-blue-600 transition duration-200 ease-in-out cursor-pointer ${isSearchOpen ? 'hidden' : 'block md:hidden'}`}
                        onClick={toggleSearch}
                    />
                    <MdClose
                        className={`absolute top-2 right-3 h-6 w-6 text-gray-950 hover:text-blue-600 transition duration-200 ease-in-out cursor-pointer ${isSearchOpen ? 'block' : 'hidden md:hidden'}`}
                        onClick={toggleSearch}
                    />
                </div>

                <nav className={`flex items-center space-x-8 ${isSearchOpen ? 'hidden' : 'hidden md:flex'}`}>
                    <button
                        aria-label="Location"
                        className="text-gray-600 hover:text-blue-600 transition duration-200 ease-in-out"
                    >
                        <MdLocationOn className="h-6 w-6 text-gray-950" />
                    </button>
                    <button
                        aria-label="Shopping Cart"
                        className="text-gray-600 hover:text-blue-600 transition duration-200 ease-in-out relative"
                    >
                        <MdShoppingCart className="h-6 w-6 text-gray-950" />
                    </button>
                    <button
                        aria-label="Notifications"
                        className="text-gray-600 hover:text-blue-600 transition duration-200 ease-in-out relative"
                    >
                        <MdNotifications className="h-6 w-6 text-gray-950" />
                    </button>
                    <div className="relative">
                        <button
                            aria-label="User Profile"
                            className="text-gray-600 hover:text-blue-600 transition duration-200 ease-in-out flex items-center"
                        >
                            <MdPerson className="h-6 w-6 text-gray-950" />
                            {user && <span className="ml-2 text-gray-950">{user.name}</span>}
                        </button>
                        {user && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                                <Link href="/profile">
                                    <a className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Profile</a>
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center px-4 py-2 w-full text-left text-gray-800 hover:bg-gray-100"
                                >
                                    <MdLogout className="mr-2" />
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </nav>
            </div>

            <div className="bg-base-300 px-4 py-2 shadow-sm">
                <ul className="flex space-x-8 text-lg text-black">
                    <li>
                        <Link href="/all">
                            All
                        </Link>
                    </li>
                    <li>
                        <Link href="/stay">
                            Stay
                        </Link>
                    </li>
                    <li>
                        <details>
                            <summary>Food</summary>
                            <ul className="p-2 bg-gray-100 rounded-lg shadow-lg">
                                <li>
                                    <Link href="/food/submenu1">
                                        Submenu 1
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/food/submenu2">
                                        Submenu 2
                                    </Link>
                                </li>
                            </ul>
                        </details>
                    </li>
                    <li>
                        <Link href="/travel">
                            Travel
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;
