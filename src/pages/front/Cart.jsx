import React, { useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { numberWithCommas } from "../../function/function";
import OrderProgress from "../../components/OrderProgress";
import Loading from "../../components/Loading";
import axios from "axios";
import { toastDeleteItem, toastUpdateQty } from "../../components/Toast";

const Cart = () => {
  const { cartData, getCart } = useOutletContext();
  const [isLoading, setIsLoading] = useState(false);

  const deleteCartItem = async (id) => {
    setIsLoading(true);
    try {
      await axios.delete(`v2/api/${process.env.REACT_APP_API_PATH}/cart/${id}`);
      getCart();
      setIsLoading(false);
      toastDeleteItem();
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const updateCartItem = async (item, quantity) => {
    const data = {
      data: {
        product_id: item.product_id,
        qty: quantity,
      },
    };
    setIsLoading(true);
    try {
      await axios.put(
        `v2/api/${process.env.REACT_APP_API_PATH}/cart/${item.id}`,
        data
      );
      setIsLoading(false);
      getCart();
      toastUpdateQty();
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  return (
    <>
      <Loading isLoading={isLoading} />
      <div className="container">
        <div className="row justify-content-center">
          {cartData?.carts?.length !== 0 && <OrderProgress currentStep={1} />}

          <div className="row justify-content-center">
            <div
              className="col-md-8 col-lg-6 bg-white py-5"
              style={{ minHeight: "70vh" }}
            >
              {cartData?.carts?.length === 0 ? (
                <>
                  <h3 className="text-center">
                    你的購物車是
                    <Link to="/products/all" className="fw-bolder">
                      空的
                    </Link>
                  </h3>
                  <img
                    src="https://media.istockphoto.com/id/861576608/vector/empty-shopping-bag-icon-online-business-vector-icon-template.jpg?s=612x612&w=0&k=20&c=I7MbHHcjhRH4Dy0NVpf4ZN4gn8FVDnwn99YdRW2x5k0="
                    alt="empty-cart"
                  />
                </>
              ) : (
                <>
                  <div className="d-flex justify-content-between">
                    <h2 className="mt-2">
                      <i className="bi bi-cart-fill"></i> 你的購物車
                    </h2>
                  </div>

                  {cartData?.carts?.map((item) => {
                    return (
                      <div className="d-flex mt-4 bg-light pe-3" key={item.id}>
                        <Link to={`/product/${item.product.id}`}>
                          <img
                            src={item.product.imageUrl}
                            alt={item.product.title}
                            className="object-cover"
                            style={{
                              width: "120px",
                            }}
                          />
                        </Link>
                        <div className="w-100 p-3 position-relative">
                          <Link to={`/product/${item.product.id}`}>
                            <p className="mb-4 fw-bold">{item.product.title}</p>
                          </Link>
                          <div className="d-flex justify-content-between align-items-center">
                            <div className="input-group w-50 align-items-center">
                              <div className="input-group-prepend">
                                <button
                                  type="button"
                                  className="btn-sm btn btn-outline-dark border-0"
                                  disabled={item?.qty === 1}
                                  onClick={() => {
                                    if (item?.qty === 1) return;
                                    updateCartItem(item, item?.qty - 1);
                                  }}
                                >
                                  <i className="bi bi-dash"></i>
                                </button>
                              </div>
                              <input
                                type="text"
                                className="form-control border-0 text-center my-auto shadow-none bg-light px-0"
                                placeholder=""
                                aria-label="Example text with button addon"
                                aria-describedby="button-addon1"
                                readOnly
                                value={item?.qty}
                              />
                              <div className="input-group-append ">
                                <button
                                  type="button"
                                  className="btn-sm btn btn-outline-dark border-0"
                                  onClick={() =>
                                    updateCartItem(item, item?.qty + 1)
                                  }
                                >
                                  <i className="bi bi-plus"></i>
                                </button>
                              </div>
                            </div>
                            <p className="mb-0 ms-auto">
                              NT${numberWithCommas(item.product.price)}
                            </p>
                          </div>
                        </div>
                        <div
                          className="my-auto"
                          onClick={() => deleteCartItem(item.id)}
                        >
                          <i className="bi bi-trash3 cp"></i>
                        </div>
                      </div>
                    );
                  })}

                  <div className="d-flex justify-content-between mt-4">
                    <p className="mb-0 h4 fw-bold">總金額</p>
                    <p className="mb-0 h4 fw-bold">
                      NT${numberWithCommas(cartData.final_total)}
                    </p>
                  </div>
                  <Link to="/checkout" className="btn btn-dark w-100 mt-4 py-2">
                    結帳
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
