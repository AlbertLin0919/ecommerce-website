import React, { useState } from "react";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };
  return (
    <div className="col-md-5 position-relative">
      <Link
        to={`/product/${product.id}`}
        className="text-dark"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="card border-0 mb-6 position-relative card-product">
          <img
            src={product.imageUrl}
            className="card-img-top rounded-0 w-100 h-100"
            alt={product.title}
          />
          {hovered && (
            <img
              src={product.imagesUrl[0]}
              className="card-img-top rounded-0 w-100 position-absolute h-100"
              alt={product.title}
            />
          )}

          <div className="card-body p-0 mb-3">
            <p className="card-title mb-0 mt-3 text-center product-text-hover">
              {product.title}
            </p>
            <p className="card-text text-center fw-bolder">
              NT${product.price}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Product;
