import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import { numberWithCommas } from "../../untils";
import Loading from "../../components/Loading";
//swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs, Navigation, Autoplay } from "swiper";

import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import {
  toastAddToCart,
  toastAddToWish,
  toastError,
  toastRemoveFromWish,
} from "../../components/Toast";
import { useDispatch, useSelector } from "react-redux";
import { toggleWishList } from "../../store/AllSlice/wishListSlice";

const ProductDetail = () => {
  const [product, setProduct] = useState({});
  const [inputValue, setInputValue] = useState(1);
  const [imagesArray, setImagesArray] = useState([]);
  const [mainImage, setMainImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [randomProducts, setRandomProducts] = useState([]);
  const [wishProduct, setWishProduct] = useState(false);
  const { getCart, cartData } = useOutletContext();

  const navigate = useNavigate("");
  const dispatch = useDispatch();
  const { wishList } = useSelector((state) => state.wishList);

  const { id } = useParams();

  const getProduct = async (id) => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `/v2/api/${process.env.REACT_APP_API_PATH}/product/${id}`
      );
      setProduct(res.data.product);
      setCategory(res.data.product.category);
      setIsLoading(false);
      const haveList = wishList.find((list) => list.id === id);
      setWishProduct(!!haveList);
    } catch (error) {
      console.log(error);
      toastError();
      setIsLoading(false);
    }
  };

  const getAllProducts = async () => {
    try {
      const res = await axios.get(
        `/v2/api/${process.env.REACT_APP_API_PATH}/products/all`
      );
      setAllProducts(res.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProduct(id);
    getAllProducts();
  }, [id]);

  useEffect(() => {
    const filteredProducts = allProducts?.filter(
      (product) => product.category === category
    );
    const newRandomProducts = getRandomProducts(filteredProducts, 8);
    setRandomProducts(newRandomProducts);
  }, [allProducts, category]);
  //用來取得隨機的Products
  const getRandomProducts = (arr, num) => {
    return arr
      .filter((arr) => arr.id !== id)
      .sort(() => Math.random() - 0.5)
      .slice(0, num);
  };

  useEffect(() => {
    if (product.imageUrl && product.imagesUrl) {
      setImagesArray([product.imageUrl, ...product.imagesUrl]);
      setMainImage(product.imageUrl);
    }
  }, [product]);

  const discount = (discount, price) => {
    return parseFloat((discount / price).toFixed(2));
  };

  const listContent = product.content?.split("。").map((item, index) => {
    if (item.trim() === "") {
      return null;
    }

    return <li key={index}>{item.trim()}</li>;
  });

  const listDescription = product.description
    ?.split("。")
    .map((item, index) => {
      if (item.trim() === "") {
        return null;
      }

      return (
        <li key={index} className="mb-1">
          {item.trim()}
        </li>
      );
    });

  const addToCart = async () => {
    const data = {
      data: {
        product_id: product.id,
        qty: inputValue,
      },
    };
    setIsLoading(true);

    try {
      const res = await axios.post(
        `/v2/api/${process.env.REACT_APP_API_PATH}/cart`,
        data
      );
      getCart();
      toastAddToCart();
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const cartNum = cartData?.carts?.find((data) => data.product_id === id);

  const addWishList = () => {
    dispatch(toggleWishList(product));
    const haveList = wishList.find((list) => list.id === id);
    setWishProduct(!haveList);
    if (haveList) {
      toastRemoveFromWish();
    } else {
      toastAddToWish();
    }
  };

  return (
    <>
      <Loading isLoading={isLoading} />
      <div className="container mt-5">
        <nav aria-label="breadcrum">
          <ol className="breadcrumb bg-transparent mb-0 ps-6 pb-3">
            <li className="breadcrumb-item">
              <Link className="text-muted" to="/">
                首頁
              </Link>
            </li>
            <li className="breadcrumb-item">
              <Link className="text-muted" to="/products/all">
                產品
              </Link>
            </li>
            <li
              className="breadcrumb-item text-muted"
              onClick={() => navigate(-1)}
              style={{ cursor: "pointer" }}
            >
              {product.category}
            </li>
            <li className="breadcrumb-item active fw-bold" aria-current="page">
              {product.title}
            </li>
          </ol>
        </nav>
        <div className="row justify-content-center">
          <div className="col-lg-5">
            <div className="imageWrapper">
              <div className="image-top">
                <img
                  src={mainImage}
                  alt={product.imageUrl}
                  className="w-100 h-100 object-fit"
                />
              </div>
              <div className="image-bottom border">
                <Swiper
                  style={{
                    "--swiper-navigation-size": "25px",
                  }}
                  spaceBetween={1}
                  slidesPerView={4}
                  navigation={true}
                  modules={[Thumbs, Navigation]}
                  className="product-images-slider-thumbs"
                >
                  {imagesArray.map((image, index) => {
                    return (
                      <SwiperSlide key={index}>
                        <div className="product-images-slider-thumbs-wrapper">
                          <img
                            src={image}
                            alt={image}
                            onClick={() => setMainImage(image)}
                            className={
                              image === mainImage ? "border border-dark" : ""
                            }
                          />
                        </div>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
            </div>
          </div>
          <div className="col-lg-5 d-flex flex-column align-item-center justify-content-between mt-3">
            <div>
              <h4 className="fw-bold h4">{product.title}</h4>
              <h4 className="text-muted fs-6">類別:{product.category}</h4>
            </div>
            <div className="detailPrice">
              <span className="text-muted ps-3">
                NT${numberWithCommas(product.origin_price)}
              </span>
              <h4 className="h4 fw-bold ">
                NT${numberWithCommas(product.price)}
              </h4>
              <p>
                {(discount(product.price, product.origin_price) * 10).toFixed(
                  1
                )}
                折
              </p>
            </div>
            <div className="fs-6">
              <h5 className="ms-3">商品說明:</h5>
              <ul>{listDescription}</ul>
            </div>

            {cartNum?.qty && (
              <div className="productPrompt text-black-50">
                此商品在購物車已經有{cartNum?.qty}件了囉!
              </div>
            )}

            <div className="row align-items-center">
              <div className="col-12">
                <div className="input-group my-3 bg-light rounded">
                  <div className="input-group-prepend">
                    <button
                      className={`btn btn-outline-dark border-0 py-2 ${
                        inputValue === 1 && "not-allow"
                      }`}
                      type="button"
                      id="button-addon1"
                      onClick={() =>
                        setInputValue((prev) => (prev === 1 ? prev : prev - 1))
                      }
                    >
                      <i className="bi bi-dash"></i>
                    </button>
                  </div>
                  <input
                    type="text"
                    className="form-control border-0 text-center my-auto shadow-none bg-light"
                    placeholder=""
                    aria-label="Example text with button addon"
                    aria-describedby="button-addon1"
                    min={1}
                    value={inputValue}
                    readOnly
                  />
                  <div className="input-group-append">
                    <button
                      className={`btn btn-outline-dark border-0 py-2 ${
                        inputValue === 10 && "not-allow"
                      }`}
                      type="button"
                      id="button-addon2"
                      onClick={() =>
                        setInputValue((prev) => (prev === 10 ? prev : prev + 1))
                      }
                    >
                      <i className="bi bi-plus"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-6">
                <button
                  type="button"
                  className="text-nowrap btn btn-danger w-100 py-2"
                  onClick={addWishList}
                >
                  {wishProduct ? (
                    <i className="bi bi-heart-fill"></i>
                  ) : (
                    <i className="bi bi-heart"></i>
                  )}
                </button>
              </div>
              <div className="col-6">
                <button
                  type="button"
                  className="text-nowrap btn btn-dark w-100 py-2"
                  onClick={addToCart}
                  disabled={isLoading}
                >
                  加入購物車
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row my-5">
          <div className="col-md-6 offset-md-1">
            <p className="text-muted pb-3">{listContent}</p>
          </div>
        </div>
        <h3 className="fw-bold text-center underline-text">你可能會喜歡</h3>
        <div className="swiper-container my-6">
          <Swiper
            style={{
              "--swiper-navigation-size": "30px",
            }}
            autoplay={{ delay: 2500 }}
            navigation={true}
            loop={true}
            modules={[Autoplay, Navigation]}
            className="mySwiper"
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 8,
              },
              576: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              992: {
                slidesPerView: 4,
                spaceBetween: 30,
              },
              1200: {
                slidesPerView: 4,
                spaceBetween: 40,
              },
            }}
          >
            {randomProducts.map((product) => {
              return (
                <SwiperSlide className="swiperSlide" key={product.id}>
                  <Link
                    to={`/product/${product.id}`}
                    className="text-dark text-center"
                  >
                    <img
                      src={product.imageUrl}
                      alt={product.title}
                      className="w-100 h-100 object-fit"
                    />
                    <p className="swiperSlide-text">{product.title}</p>
                  </Link>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
