import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

import Category from "./Category";

const PadCase = () => {
  const { products, getProducts, pagination } = useOutletContext();

  useEffect(() => {
    getProducts(1, "iPad保護殼");
  }, []);

  return (
    <>
      <Category
        title="平板保護殼"
        products={products}
        getProducts={getProducts}
        pagination={pagination}
        category="iPad保護殼"
      />
    </>
  );
};

export default PadCase;
