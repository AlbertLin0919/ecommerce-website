import Login from "./pages/Login";
import Dashboard from "./pages/admin/Dashboard";
import AdminProducts from "./pages/admin/AdminProducts.jsx";
import AdminCoupons from "./pages/admin/AdminCoupons";
import AdminOrders from "./pages/admin/AdminOrders";

import { Routes, Route } from "react-router-dom";
import FrontLayout from "./pages/front/FrontLayout";
import Home from "./pages/front/Home";
import Products from "./pages/front/Products";
import ProductDetail from "./pages/front/ProductDetail";
import Cart from "./pages/front/Cart";
import Checkout from "./pages/front/Checkout";
import Success from "./pages/front/Success";
import PhoneCase from "./components/products/PhoneCase";
import PadCase from "./components/products/PadCase";
import AirpodsCase from "./components/products/AirpodsCase";
import PowerBank from "./components/products/PowerBank";
import All from "./components/products/All";
import NotFound from "./pages/NotFound";
import WishList from "./pages/front/WishList";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<FrontLayout />}>
          <Route path="" element={<Home />} />
          <Route path="products" element={<Products />}>
            <Route path="all" element={<All />} />
            <Route path="phonecase" element={<PhoneCase />} />
            <Route path="padcase" element={<PadCase />} />
            <Route path="airpodscase" element={<AirpodsCase />} />
            <Route path="powerbank" element={<PowerBank />} />
          </Route>
          <Route path="product/:id" element={<ProductDetail />} />
          <Route path="wishlist" element={<WishList />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="success/:orderId" element={<Success />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/admin" element={<Dashboard />}>
          <Route path="products" element={<AdminProducts />} />
          <Route path="coupons" element={<AdminCoupons />} />
          <Route path="orders" element={<AdminOrders />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
