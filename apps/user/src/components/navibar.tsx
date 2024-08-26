import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link'; 
import Slidebar from './slidebar1';
import { MdShoppingCart, MdPerson, MdLocationOn, MdSearch, MdClose, MdNotifications } from 'react-icons/md';



const Navbar: React.FC = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const router = useRouter();

    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
    };

    const navigateToLogin = () => {
        router.push('/login');
    };

    return (
        <div>
            {/* Main Navbar */}
            <div className="bg-gray-100 flex items-center justify-between px-4 py-2 shadow-md">
                {/* Slidebar and SHELTERIC text */}
                <div className={`flex items-center ${isSearchOpen ? 'hidden' : 'flex'} md:flex`}>
                    <div className="hidden md:block">
                        <Slidebar />
                    </div>
                    <div className="text-black font-bold text-2xl ml-2">
                        SHELTERIC
                    </div>
                </div>

                {/* Search Bar and Icon Container */}
                <div className="flex items-center flex-1 justify-center relative">
                    {/* Search Bar */}
                    <input 
                        type="text" 
                        className={`w-full max-w-md px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-950 ${isSearchOpen ? 'block' : 'hidden md:block'}`}
                        placeholder="Search for products, brands, and more..." 
                    />
                    
                    {/* Search Icon (only visible on mobile when search bar is hidden) */}
                    {!isSearchOpen && (
                        <div 
                            className="absolute top-2 right-3 h-6 w-6 text-gray-950 hover:text-blue-600 transition duration-200 ease-in-out cursor-pointer md:hidden space-x-8"
                            onClick={toggleSearch}
                        >
                            <MdSearch className="h-6 w-6" />
                        </div>
                    )}

                    {/* Close Icon (only visible on mobile when search bar is open) */} 
                    {isSearchOpen && (
                        <div 
                            className="absolute top-2 right-3 h-6 w-6 text-gray-950 hover:text-blue-600 transition duration-200 ease-in-out cursor-pointer md:hidden"
                            onClick={toggleSearch}
                        >
                            <MdClose className="h-6 w-6" />
                        </div>
                    )}
                </div>

                {/* Navigation Buttons */}
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

                    <button 
                        aria-label="User Profile" 
                        className="text-gray-600 hover:text-blue-600 transition duration-200 ease-in-out"
                        onClick={navigateToLogin}
                    >
                        <MdPerson className="h-6 w-6 text-gray-950" />
                    </button>
                </nav>
            </div>

            {/* Secondary Navbar */}
            <div className="bg-base-300 px-4 py-2 shadow-sm">
                <ul className="flex space-x-8 text-lg text-gray-950">
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
