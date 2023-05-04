import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../../components/Loading";
import { NavLink, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTempPage } from "../../store/Slice/tempPageSlice";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const { tempPage } = useSelector((state) => state.tempPage);
  const { tempCategory } = useSelector((state) => state.tempPage);

  const getProducts = async (page = 1, category = "") => {
    setIsLoading(true);
    try {
      const productRes = await axios.get(
        `/v2/api/${process.env.REACT_APP_API_PATH}/products?page=${page}&category=${category}`
      );
      setProducts(productRes.data.products);
      setPagination(productRes.data.pagination);
      setIsLoading(false);
      dispatch(getTempPage({ page, category }));
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProducts(tempPage, tempCategory);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pagination]);

  return (
    <>
      <Loading isLoading={isLoading} />
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
            opacity: "0.7",
            zIndex: "-1",
          }}
        ></div>
      </div>
      <div className="container mt-md-5 mt-3 mb-7">
        <div className="row">
          <div className="col-lg-3">
            <div
              className="accordion border border-bottom border-top-0 border-start-0 border-end-0 mb-3"
              id="accordionExample"
            >
              <div className="card border-0 bg-transparent">
                <div
                  className="card-header px-0 py-4 bg-white border border-bottom-0 border-top border-start-0 border-end-0 bg-transparent"
                  id="headingOne"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                >
                  <div className="d-flex justify-content-between align-items-center pe-1 ps-4">
                    <h4 className="mb-0">商品列表</h4>
                    <i className="bi bi-chevron-down cp"></i>
                  </div>
                </div>
                <div
                  id="collapseOne"
                  className="collapse show"
                  aria-labelledby="headingOne"
                  data-bs-parent="#accordionExample"
                >
                  <div className="card-body py-0">
                    <ul className="sidebar">
                      <li>
                        <NavLink
                          to="/products/all"
                          className="py-2 d-block text-muted"
                        >
                          全部商品
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/products/phonecase"
                          className="py-2 d-block text-muted"
                        >
                          手機殼
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/products/padcase"
                          className="py-2 d-block text-muted"
                        >
                          平板保護殼
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/products/airpodscase"
                          className="py-2 d-block text-muted"
                        >
                          airpods保護殼
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/products/powerbank"
                          className="py-2 d-block text-muted"
                        >
                          電源專區
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Outlet context={{ products, getProducts, pagination }} />
        </div>
      </div>
    </>
  );
};

export default Products;
