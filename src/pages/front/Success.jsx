import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useOutletContext, useParams } from "react-router-dom";
import { numberWithCommas } from "../../function/function";
import OrderProgress from "../../components/OrderProgress";

const Success = () => {
  const { orderId } = useParams();
  const [orderItem, setOrderItem] = useState({});
  const { getCart } = useOutletContext();

  const getOrderCart = async (id) => {
    try {
      const res = await axios.get(
        `/v2/api/${process.env.REACT_APP_API_PATH}/order/${orderId}`
      );
      setOrderItem(res.data.order);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrderCart(orderId);
    getCart();
  }, [orderId]);

  const date = new Date(orderItem?.create_at * 1000);
  const taiwanDate = new Date(
    date.toLocaleString("en-US", { timeZone: "Asia/Taipei" })
  );
  const year = taiwanDate.getFullYear();
  const month = taiwanDate.getMonth() + 1;
  const day = taiwanDate.getDate();
  const hours = taiwanDate.getHours();
  const minutes = taiwanDate.getMinutes();
  const formattedDate = `  ${year}年${month.toString().padStart(2, "0")}月${day
    .toString()
    .padStart(2, "0")}日 ${hours.toString().padStart(2, "0")}時${minutes
    .toString()
    .padStart(2, "0")}分`;

  return (
    <>
      <div
        className="position-relative d-flex align-items-center justify-content-center"
        style={{ minHeight: "400px" }}
      >
        <div
          className="position-absolute"
          style={{
            top: "0",
            bottom: "0",
            left: "0",
            right: "0",
            backgroundImage:
              "url('https://images.unsplash.com/photo-1616876195047-522271be4e66?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80')",
            backgroundPosition: "center center",
            zIndex: "-1",
          }}
        ></div>
      </div>
      <div className="container">
        <div className="mt-3 mb-7">
          <div
            role="alert"
            className="fade d-flex align-items-center alert alert-success alert-dismissible show"
          >
            <i className="bi bi-check-circle pe-2"></i>
            <span className="fs-5">謝謝您!你的訂單已成立</span>
          </div>

          <div className="row mb-6">
            <div className="row justify-content-center">
              <div className="col-12">
                <OrderProgress currentStep={[1, 2, 3]} />
              </div>
            </div>
            <div className="col-md-7">
              <div className="card rounded-0 py-4">
                <div className="card-header border-bottom-0 bg-white px-4 py-0">
                  <h2>您購買的商品</h2>
                </div>
                <div className="card-body px-4 py-0">
                  <ul className="list-group list-group-flush">
                    {/* 這邊是把object轉成array，資料取得前，orderItem?.products可能為undifined所以加上了||{} */}
                    {Object.values(orderItem?.products || {}).map((item) => {
                      return (
                        <li className="list-group-item px-0" key={item.id}>
                          <div className="d-flex mt-2">
                            <img
                              src={item.product.imageUrl}
                              alt=""
                              className="me-2"
                              style={{
                                width: "60px",
                                height: "60px",
                                objectFit: "cover",
                              }}
                            />
                            <div className="w-100 d-flex flex-column">
                              <div className="d-flex justify-content-between fw-bold">
                                <h5>{item.product.title}</h5>
                                <p className="mb-0">
                                  {item.qty}
                                  {item.product.unit}
                                </p>
                              </div>
                              <div className="d-flex justify-content-between mt-auto">
                                <p className="text-muted mb-0">
                                  <small>
                                    NT${numberWithCommas(item.product.price)}
                                  </small>
                                </p>
                                <p className="mb-0">
                                  NT${numberWithCommas(item.final_total)}
                                </p>
                              </div>
                            </div>
                          </div>
                        </li>
                      );
                    })}

                    <li className="list-group-item px-0 pb-0">
                      <div className="d-flex justify-content-between mt-2">
                        <p className="mb-0 h4 fw-bold">總金額:</p>
                        <p className="mb-0 h4 fw-bold">
                          NT${numberWithCommas(orderItem.total)}
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-5">
              <div className="card rounded-0 py-4">
                <div className="card-header border-bottom-0 bg-white px-4 py-0">
                  <h4>您的訂單資料</h4>
                </div>
                <div className="card-body px-4 py-0">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      姓名:{orderItem?.user?.name}
                    </li>
                    <li className="list-group-item">
                      電話:{orderItem?.user?.tel}
                    </li>
                    <li className="list-group-item">
                      信箱:{orderItem?.user?.email}
                    </li>
                    <li className="list-group-item">
                      地址:{orderItem?.user?.address}
                    </li>
                    <li className="list-group-item">
                      訂購日期:{formattedDate}
                    </li>
                    <li className="list-group-item">
                      你的留言:{orderItem?.message}
                    </li>
                    <li className="list-group-item">
                      訂單編號:{orderItem?.id}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <p className="text-black-50">
                親愛的顧客，非常感謝您在我們的購物網站上購買商品！我們非常珍惜您對我們的信任，並致力於為您提供最好的服務和產品。
                <br />
                您的訂單已經收到並正在處理中。我們將盡快安排發貨，並會通過郵件或手機短信提供物流信息，請您耐心等待。
              </p>

              <p className="text-black-50">
                如果您對產品有任何問題或意見，請隨時與我們聯繫。我們的客服團隊將會在第一時間回覆您的郵件或電話，並盡力解決您的問題。
                <br />
                再次感謝您的購買，祝您生活愉快！
              </p>
              <Link to="/" className="btn btn-outline-dark me-2 rounded-0 mb-4">
                返回繼續購物
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Success;
