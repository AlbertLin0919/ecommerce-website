import { useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { numberWithCommas } from "../../untils";
import { removeWishList } from "../../store/AllSlice/wishListSlice";
import {
  toastAddToCart,
  toastError,
  toastRemoveFromWish,
} from "../../components/Toast";
import Loading from "../../components/Loading";

const WishList = () => {
  const { wishList } = useSelector((state) => state.wishList);
  const dispatch = useDispatch();
  const { getCart } = useOutletContext();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const addToCart = async (id) => {
    const data = {
      data: {
        product_id: id,
        qty: 1,
      },
    };
    setIsLoading(true);
    try {
      await axios.post(`/v2/api/${process.env.REACT_APP_API_PATH}/cart`, data);
      toastAddToCart();
      getCart();
      setIsLoading(false);
    } catch (error) {
      toastError();
      setIsLoading(false);
    }
  };
  return (
    <>
      <Loading isLoading={isLoading} />
      <div style={{ minHeight: "70vh" }}>
        <div className="container mt-6">
          <div className="row justify-content-center">
            <div className="col-8">
              {wishList.length !== 0 ? (
                <>
                  {" "}
                  <h2 className="mb-5">
                    <i className="bi bi-bag-heart pe-1"></i>願望清單
                  </h2>
                  {wishList.map((product) => {
                    return (
                      <div
                        className="wishlist-item d-flex align-items-center text-start row pb-3 mb-4"
                        key={product.id}
                      >
                        <div className="col-lg-6 col-12 d-flex">
                          <Link to={`/product/${product.id}`}>
                            <div className="wish-image">
                              <img
                                src={product.imageUrl}
                                alt={product.title}
                                className="w-100 object-fit "
                              />
                            </div>
                          </Link>
                          <div className="wish-title ps-2 pt-3">
                            <Link
                              to={`/product/${product.id}`}
                              className="wish-title"
                            >
                              <h3 className="fs-6 fw-bold">{product.title}</h3>
                            </Link>
                            <p>種類:{product.category}</p>
                          </div>
                        </div>
                        <div className="col-lg-6 col-12 mt-3">
                          <div className="row align-items-center justify-content-around">
                            <div className="col-3 p-0">
                              <div className="price">
                                NT${numberWithCommas(product.price)}
                              </div>
                            </div>
                            <div className="col-3 d-flex align-items-center justify-content-center">
                              <button
                                className="btn btn-outline-dark bi bi-cart-fill"
                                onClick={() => addToCart(product.id)}
                              ></button>
                            </div>
                            <div className="col-3">
                              <div
                                className="wish-remove text-muted"
                                onClick={() => {
                                  dispatch(removeWishList(product.id));
                                  toastRemoveFromWish();
                                }}
                              >
                                <i className="bi bi-x-lg"></i>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </>
              ) : (
                <div className="emptyWishList">
                  <h2 className="mb-5">你的願望清單是空的</h2>
                  <img
                    src="https://diajewelsnyc.com/assets/images/empty-wishlist.png"
                    alt="emptyWishList"
                  />
                  <button
                    className="btn btn-outline-dark py-2 px-4 mt-3"
                    onClick={() => navigate("/products/all")}
                  >
                    去逛逛
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WishList;
