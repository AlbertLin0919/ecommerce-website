import React from "react";
import { NavLink } from "react-router-dom";

const Nav = ({ cartData }) => {
  return (
    <>
      <nav className="navbar-sticky shadow-sm bg-body-tertiary">
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light">
            <NavLink className="navbar-brand" to="/">
              Phone
            </NavLink>
            <button
              className="navbar-toggler show"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div
              className="collapse navbar-collapse justify-content-end"
              id="navbarNav"
            >
              <div className="navbar-nav">
                <NavLink className="nav-item nav-link me-4" to="/">
                  首頁
                </NavLink>
                <NavLink className="nav-item nav-link me-4" to="/products/all">
                  產品
                </NavLink>
                <NavLink className="nav-item nav-link me-4" to="/wishlist">
                  願望清單
                </NavLink>
                <NavLink
                  className="nav-item nav-link position-relative"
                  to="/cart"
                >
                  <i className="bi bi-cart-fill"></i>
                  <span className="position-absolute top-3 start-11 start-md-100 translate-middle badge rounded-pill bg-danger">
                    {cartData?.carts?.length === 0
                      ? ""
                      : cartData?.carts?.length}
                  </span>
                </NavLink>
              </div>
            </div>
          </nav>
        </div>
      </nav>
    </>
  );
};

export default Nav;
