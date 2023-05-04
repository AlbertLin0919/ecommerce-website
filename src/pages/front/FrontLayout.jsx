import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Nav from "../../components/front/Nav";
import Footer from "../../components/front/Footer";
import Message from "../../components/Message";
import axios from "axios";

//toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FrontLayout = () => {
  const [cartData, setCartData] = useState({});

  const getCart = async () => {
    try {
      const res = await axios.get(
        `/v2/api/${process.env.REACT_APP_API_PATH}/cart`
      );
      setCartData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <>
      <ToastContainer
        position="top-center"
        hideProgressBar
        autoClose={3000}
        newestOnTop
      />
      <Nav cartData={cartData} />
      <Message />
      <Outlet context={{ getCart, cartData }} />
      <Footer />
    </>
  );
};

export default FrontLayout;
