import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

import Category from "./Category";

const AirpodsCase = () => {
  const { products, getProducts, pagination } = useOutletContext();

  useEffect(() => {
    getProducts(1, "airpods");
  }, []);

  return (
    <>
      <Category
        title="Airpods"
        products={products}
        getProducts={getProducts}
        pagination={pagination}
        category="airpods"
      />
    </>
  );
};

export default AirpodsCase;
