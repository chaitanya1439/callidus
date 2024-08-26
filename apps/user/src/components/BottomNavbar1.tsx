import React from 'react';
import Link from 'next/link';
import { MdHome, MdSearch, MdShoppingCart, MdPerson, MdFavorite } from 'react-icons/md';
import Slidebar from './slidebar1';



const BottomNavbar: React.FC= () => {
    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white shadow-md md:hidden">
            <ul className="flex justify-around items-center py-2">
                <li>
                    <Link href="/" passHref>
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
                    <Link href="/login" passHref>
                        <div className="flex flex-col items-center text-sm hover:text-blue-500 transition duration-200 ease-in-out">
                            <MdPerson className="h-6 w-6" />
                            <span>Profile</span>
                        </div>
                    </Link>
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
