import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Shop from "./Pages/Shop";
import ShopCategory from "./Pages/ShopCategory";
import Product from "./Pages/Product";
import Cart from "./Pages/Cart";
import LoginSignup from "./Pages/LoginSignup";
import {ToastContainer} from 'react-toastify';
import men_banner from "./Components/Assets/men_banner.jpg";
import women_banner from "./Components/Assets/women_banner.jpg";
import kids_banner from "./Components/Assets/kids_banner.webp";
import Payment from "./Components/Payment/Payment";

function App() {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<Shop />} />

        <Route
          path="/mens"
          element={<ShopCategory banner={men_banner} category="men" />}
        />
        <Route
          path="/womens"
          element={<ShopCategory banner={women_banner} category="women" />}
        />
        <Route
          path="/kids"
          element={<ShopCategory banner={kids_banner} category="kid" />}
        />

        <Route path="/product/:productid" element={<Product />} />

        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<LoginSignup />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>


      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
}

export default App;