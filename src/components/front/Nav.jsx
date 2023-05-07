import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Nav = ({ cartData }) => {
  const { wishList } = useSelector((state) => state.wishList);

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
                <NavLink
                  className="nav-item nav-link me-4 position-relative"
                  to="/wishlist"
                >
                  <i className="bi bi-bag-heart"></i>
                  <span className="position-absolute top-3 start-11 start-md-100 translate-middle badge rounded-pill bg-danger icon-span">
                    {wishList.length === 0 ? "" : wishList.length}
                  </span>
                </NavLink>
                <NavLink
                  className="nav-item nav-link position-relative"
                  to="/cart"
                >
                  <i className="bi bi-cart-fill"></i>
                  <span className="position-absolute top-3 start-11 start-md-100 translate-middle badge rounded-pill bg-danger icon-span">
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
