import React, { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import Category from "./Category";

const PhoneCase = () => {
  const { products, getProducts, pagination } = useOutletContext();

  useEffect(() => {
    getProducts(1, "手機殼");
  }, []);

  return (
    <>
      <Category
        title="手機殼"
        products={products}
        getProducts={getProducts}
        pagination={pagination}
        category="手機殼"
      />
    </>
  );
};

export default PhoneCase;
