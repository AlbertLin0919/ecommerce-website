import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-dark py-5">
      <div className="container">
        <div className="d-flex align-items-center justify-content-between text-white mb-md-7 mb-4">
          <Link className="text-white h4" to="/">
            Phone
          </Link>
          <ul className="d-flex list-unstyled mb-0 h4">
            <li>
              <Link to="/" className="text-white mx-3">
                <i className="bi bi-facebook"></i>
              </Link>
            </li>
            <li>
              <Link to="/" className="text-white mx-3">
                <i className="bi bi-instagram"></i>
              </Link>
            </li>
            <li>
              <Link to="/" className="text-white mx-3">
                <i className="bi bi-github"></i>
              </Link>
            </li>
            <li>
              <Link to="/" className="text-white ms-3">
                <i className="bi bi-line"></i>
              </Link>
            </li>
          </ul>
        </div>
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end align-items-start text-white">
          <div className="mb-md-0 mb-1">
            <p className="mb-0">02-3456-7890</p>
            <p className="mb-0">service@gmail.com</p>
            <Link to="/login" className="link-light admin-login">
              Admin Login
            </Link>
          </div>
          <p className="mb-0">© 2023 PHONE All Rights Reserved.</p>

          <p className="mb-0">此網頁為學習使用，不做任何商業用途</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
