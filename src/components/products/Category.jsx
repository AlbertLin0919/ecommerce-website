import Pagination from "../Pagination";
import Product from "../Product";

const Category = ({ title, products, getProducts, pagination, category }) => {
  return (
    <>
      <div className="col-lg-9">
        <h2 className="ps-5 pb-5">{title}</h2>
        <div className="row justify-content-evenly">
          {products.map((product) => {
            return <Product product={product} key={product.id} />;
          })}
        </div>
        <nav className="d-flex justify-content-center">
          <Pagination
            pagination={pagination}
            changePage={getProducts}
            category={category}
          />
        </nav>
      </div>
    </>
  );
};

export default Category;
