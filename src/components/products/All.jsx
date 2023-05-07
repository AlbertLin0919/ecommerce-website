import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

import Product from "../Product";
import Pagination from "../Pagination";

const All = () => {
  const { products, getProducts, pagination } = useOutletContext();

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <div className="col-lg-9">
        <h2 className="ps-5 pb-5">全部商品</h2>
        <div className="row justify-content-evenly g-4">
          {products.map((product) => {
            return <Product product={product} key={product.id} />;
          })}
        </div>
        <nav className="d-flex justify-content-center">
          <Pagination pagination={pagination} changePage={getProducts} />
        </nav>
      </div>
    </>
  );
};

export default All;
