import Banner from "../components/banner";
import BottomNavbar from "../components/BottomNavbar1";
import CartPage from "../components/cart";
import Navbar from "../components/navibar";

export function Index() {
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <div className="bg-gray-100 w-full fixed top-0 left-0 z-50">
        <Navbar />
      </div>
      <div className="flex-grow pt-12">
        <Banner />
      </div>
      <CartPage />
      <BottomNavbar />
    </div>
  );
}

export default Index;
