import React, { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import Category from "./Category";

const PowerBank = () => {
  const { products, getProducts, pagination } = useOutletContext();

  useEffect(() => {
    getProducts(1, "充電區");
  }, []);

  return (
    <>
      <Category
        title="充電專區"
        products={products}
        getProducts={getProducts}
        pagination={pagination}
        category="充電區"
      />
    </>
  );
};

export default PowerBank;
