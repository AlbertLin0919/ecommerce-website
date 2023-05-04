import React, { useEffect, useState } from "react";
import { Link, useOutletContext, useNavigate } from "react-router-dom";
import { useForm, useWatch } from "react-hook-form";
import { Input } from "../../components/FormElement";
import axios from "axios";
import { numberWithCommas } from "../../function/function";
import OrderProgress from "../../components/OrderProgress";
import Loading from "../../components/Loading";

const Checkout = () => {
  const { cartData } = useOutletContext();
  const [addressData, setAddressData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const onSubmit = async (data) => {
    const { city, address, district, email, name, tel, comment } = data;
    const form = {
      data: {
        user: {
          name,
          email,
          tel,
          address: `${city}${district}${address}`,
        },
        message: comment,
      },
    };
    setIsLoading(true);
    try {
      const res = await axios.post(
        `/v2/api/${process.env.REACT_APP_API_PATH}/order`,
        form
      );
      console.log(res);
      setIsLoading(false);

      if (res.data.success) {
        navigate(`/success/${res.data.orderId}`);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  //用來觀察使用者是否已選城市，根據使用者的城市顯示不同的區域
  const watchForm = useWatch({ control });

  const twCity = axios.create({
    baseURL: "",
  });

  useEffect(() => {
    (async () => {
      const res = await twCity.get("/TwCities.json");
      setAddressData(res.data);
    })();
  }, [twCity]);
  return (
    <>
      <Loading isLoading={isLoading} />
      <div className="bg-light pt-5 pb-7" style={{ minHeight: "70vh" }}>
        <div className="container">
          <div className="row justify-content-center">
            <OrderProgress currentStep={[1, 2]} />
          </div>
          <div className="row justify-content-center flex-md-row">
            <div className="col-lg-6">
              <div className="bg-white p-4">
                <h4 className="fw-bold">訂單資料</h4>
                <p className="mt-4">請輸入真實訊息</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-3 form-floating">
                    <Input
                      id="email"
                      type="email"
                      errors={errors}
                      labelText="Email"
                      placeholder="Email"
                      register={register}
                      rules={{
                        required: "請填入電子郵件",
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: "請輸入正確的格式",
                        },
                        minLength: {
                          value: 10,
                          message: "不能低於10個字",
                        },
                      }}
                    />
                  </div>
                  <div className="mb-3 form-floating">
                    <Input
                      id="name"
                      type="text"
                      errors={errors}
                      labelText="姓名"
                      placeholder="姓名"
                      register={register}
                      rules={{
                        required: "請填入姓名",
                        minLength: {
                          value: 2,
                          message: "不能低於2個字",
                        },
                        maxLength: {
                          value: 20,
                          message: "不能超過20個字",
                        },
                      }}
                    />
                  </div>
                  <div className="mb-3 form-floating">
                    <Input
                      id="tel"
                      type="tel"
                      errors={errors}
                      labelText="手機號碼"
                      placeholder="手機"
                      register={register}
                      rules={{
                        required: "請輸入手機號碼",
                        pattern: {
                          value: /09/i,
                          message: "請輸入格式為[09]開頭的手機號碼",
                        },
                        minLength: {
                          value: 10,
                          message: "手機號碼不可低於10個",
                        },
                      }}
                    />
                  </div>
                  <div className="mb-3 form-floating row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="city" className="form-label">
                        縣市
                      </label>

                      <select
                        id="city"
                        className={`form-select ${errors.city && "is-invalid"}`}
                        {...register("city", {
                          required: {
                            value: true,
                            message: "請選擇你的縣市",
                          },
                        })}
                      >
                        <option value="">請選擇縣市</option>
                        {addressData.map((city, index) => {
                          return (
                            <option value={city.name} key={index}>
                              {city.name}
                            </option>
                          );
                        })}
                      </select>
                      {errors.city && (
                        <div className="invalid-feedback">
                          {errors.city.message}
                        </div>
                      )}
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="district" className="form-label">
                        鄉鎮市區
                      </label>
                      <select
                        id="district"
                        className={`form-select ${
                          errors.district && "is-invalid"
                        }`}
                        {...register("district", {
                          required: {
                            value: true,
                            message: "請選擇鄉鎮市區",
                          },
                        })}
                        disabled={!watchForm.city}
                      >
                        <option value="">請選擇鄉鎮市區</option>
                        {addressData
                          .find((city) => city.name === watchForm.city)
                          ?.districts.map((d) => {
                            return (
                              <option value={d.name} key={d.zip}>
                                {d.name}
                              </option>
                            );
                          })}
                      </select>
                      {errors.district && (
                        <div className="invalid-feedback">
                          {errors.district.message}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="mb-3 form-floating">
                    <Input
                      id="address"
                      type="text"
                      errors={errors}
                      labelText="街道(巷弄)門牌號(樓層)"
                      placeholder="地址"
                      register={register}
                      rules={{
                        required: "請填入地址",
                      }}
                    />
                  </div>

                  <div className="mb-2 form-floating">
                    <textarea
                      id="comment"
                      placeholder="留言"
                      style={{ height: "100px" }}
                      className={`form-control ${
                        errors.comment && "is-invalid"
                      }`}
                      {...register("comment")}
                    />
                    {errors.comment && (
                      <div className="invalid-feedback">
                        {errors.comment.message}
                      </div>
                    )}
                    <label htmlFor="comment" className="text-black-50">
                      留言
                    </label>
                  </div>

                  <div className="d-flex mt-4 justify-content-between align-items-lg-center w-100">
                    <Link to="/products" className="text-dark mt-md-0 mt-3">
                      <i className="bi bi-chevron-left"></i>返回看更多商品
                    </Link>
                    <button type="submit" className="btn btn-dark py-3 px-7">
                      結帳
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="border p-3 mb-4">
                <h4 className="mb-4">訂單明細</h4>

                {cartData?.carts?.map((cart) => {
                  return (
                    <div className="d-flex mb-4 py-2" key={cart.id}>
                      <Link to={`/product/${cart.product.id}`}>
                        <img
                          src={cart.product.imageUrl}
                          alt={cart.product.title}
                          className="me-2"
                          style={{
                            width: "48px",
                            height: "48px",
                            objectFit: "cover",
                          }}
                        />
                      </Link>
                      <div className="w-100">
                        <div className="d-flex justify-content-between fw-bold">
                          <Link to={`/product/${cart.product.id}`}>
                            <p className="mb-0 pe-4 limit-text">
                              {cart.product.title}
                            </p>
                          </Link>
                          <p className="mb-0">
                            {cart.qty} <span>{cart.product.unit}</span>
                          </p>
                        </div>
                        <div className="d-flex justify-content-between">
                          <p className="text-muted mb-0">
                            <small>
                              NT${numberWithCommas(cart.product.price)}
                            </small>
                          </p>
                          <p className="mb-0">
                            NT${numberWithCommas(cart.final_total)}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}

                <table className="table mt-4 border-top border-bottom text-muted">
                  <tbody>
                    <tr>
                      <th
                        scope="row"
                        className="border-0 px-0 pt-4 font-weight-normal"
                      >
                        總價
                      </th>
                      <td className="text-end border-0 px-0 pt-4">
                        NT${numberWithCommas(cartData?.total)}
                      </td>
                    </tr>
                    <tr>
                      <th
                        scope="row"
                        className="border-0 px-0 pt-0 pb-4 font-weight-normal"
                      >
                        折扣優惠
                      </th>
                      <td className="text-end border-0 px-0 pt-0 pb-4">NT$0</td>
                    </tr>
                  </tbody>
                </table>
                <div className="d-flex justify-content-between mt-4">
                  <p className="mb-0 h4 fw-bold">最終價格</p>
                  <p className="mb-0 h4 fw-bold">
                    NT${numberWithCommas(cartData?.final_total)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
