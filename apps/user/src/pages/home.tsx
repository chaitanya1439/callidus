import React from 'react'
import Navbar from '../components/navbar'
import Banner from '../components/banner'
import CartPage from '../components/cart1'
import BottomNavbar from '../components/BottomNavbar'


const home = () => {
  return (
    <div><div className="bg-gray-100 min-h-screen flex flex-col">
    <div className="w-full fixed top-0 left-0 z-50">
      <Navbar />
    </div>
    <div className="flex-grow pt-12">
      <Banner />
    </div>
    <CartPage />
    <BottomNavbar />
  </div></div>
  )
}

export default home