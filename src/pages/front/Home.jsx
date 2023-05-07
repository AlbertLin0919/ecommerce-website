import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { FreeMode, Navigation, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import AOS from "aos";

import ProductCarousel from "../../components/front/ProductCarousel";
import Loading from "../../components/Loading";
import scrollImg from "../../images/scrollDown.png";
import "aos/dist/aos.css";

const Home = () => {
  const [lastest, setLastest] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getProducts = async () => {
    setIsLoading(true);
    try {
      const productRes = await axios.get(
        `/v2/api/${process.env.REACT_APP_API_PATH}/products/all`
      );
      setLastest(productRes.data.products.slice(-7));
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
    AOS.init({ duration: 2000, delay: 600, once: true, offset: 0 });
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <Loading isLoading={isLoading} />
      <div className="position-relative">
        <div
          className="position-absolute"
          style={{
            top: "0",
            bottom: "0",
            left: "0",
            right: "0",
            backgroundImage:
              "url('https://images.unsplash.com/photo-1665743042268-4439d6bd0b3c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80')",
            backgroundPosition: "center center",
            opacity: "0.8",
            objectFit: "cover",
            zIndex: "-1",
          }}
        >
          <img src={scrollImg} alt="scrollDown" className="scrollDown" />
        </div>
        <div
          className="container d-flex flex-column"
          style={{ minHeight: "70vh" }}
        >
          <div className="row justify-content-center my-auto">
            <div className="col-lg-4 text-center text-white text-animation">
              <h1>iPhone</h1>
              <p className="mb-0 text-white fs-1 mb-4">快來選擇你的手機殼吧!</p>
              <Link to="/products/all">去逛逛</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row mt-5">
          <h2 className="text-center mb-3 underline-text">最新產品</h2>
          <Swiper
            data-aos="zoom-in"
            data-aos-delay="0"
            data-aos-duration="1700"
            style={{
              "--swiper-navigation-size": "30px",
            }}
            freeMode={true}
            autoplay={{ delay: 2500 }}
            navigation={true}
            loop={true}
            modules={[FreeMode, Autoplay, Navigation]}
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
                spaceBetween: 30,
              },
              992: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
              1200: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
          >
            {lastest.map((product) => {
              return (
                <SwiperSlide key={product.id}>
                  <Link
                    to={`/product/${product.id}`}
                    className="text-dark text-center"
                  >
                    <div className="card border-0 mb-4">
                      <img
                        src={product.imageUrl}
                        alt={product.title}
                        className="card-img-top rounded-0 h-100 object-fit"
                      />
                      <div className="card-body text-center">
                        <p>{product.title}</p>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
      <ProductCarousel />
      <div className="container my-7">
        <div className="row">
          <div className="col-md-6" data-aos="fade-right">
            <img
              src="https://images.unsplash.com/photo-1625102216615-3a61ee26e4db?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1631&q=80"
              alt="PhoneCase"
              className="img-fluid object-fit"
            />
          </div>
          <div className="col-md-4 m-auto text-center" data-aos="fade-left">
            <Link to="/products/phonecase">
              <h4 className="mt-4 product-text-hover">Phone Case</h4>
            </Link>
            <p className="text-muted">
              我們的 iPhone 14 手機殼採用 EcoShock™
              防護技術製成，將手機殼的防護性能額外提高了 20%。
            </p>
          </div>
        </div>
        <div className="row flex-row-reverse justify-content-between mt-4">
          <div className="col-md-6" data-aos="fade-left">
            <img
              src="https://images.unsplash.com/photo-1585786463773-adca330cf805?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1634&q=80"
              alt="PadCase"
              className="img-fluid object-fit"
            />
          </div>
          <div className="col-md-4 m-auto text-center" data-aos="fade-right">
            <Link to="/products/padcase">
              <h4 className="mt-4 product-text-hover">Pad Case</h4>
            </Link>
            <p className="text-muted">
              我們的平板保護殼運用了專利的 ShockShield™
              技術，不僅能夠完美地保護您的平板不受任何外力損害，還能夠額外提升
              25% 的防護效果。
            </p>
          </div>
        </div>
      </div>
      <div className="bg-light py-4">
        <div className="container">
          <div className="d-flex flex-column flex-md-row justify-content-center align-items-md-center">
            <div className="col-md-7" data-aos="zoom-in">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input-group w-md-50 mt-md-0 mt-3">
                  <input
                    id="subscribe"
                    name="subscribe"
                    type="email"
                    className={`form-control rounded-0 ${
                      errors.subscribe && "is-invalid"
                    }`}
                    placeholder="訂閱我們"
                    {...register("subscribe", {
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "請輸入正確的格式",
                      },
                    })}
                  />

                  <div className="input-group-append">
                    <button
                      className="btn btn-dark rounded-0"
                      type="button"
                      id="subscribe"
                    >
                      訂閱
                    </button>
                  </div>
                  {errors.subscribe && (
                    <div className="invalid-feedback">
                      {errors.subscribe?.message}
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
