import { IProduct } from "../../../models/Product";
import ProductCard from "../../product/ProductCard";

import "./mainProduct.scss";

const MainProducts = ({ products }: { products: IProduct[] }) => {
  return (
    <section className="mainproducts">
      <div className="mainproducts-content wrapper">
        <h3>Наши продукты</h3>
        <div className="mainproducts-content--products">
          {products.map(
            (product, index) =>
              index <= 3 && <ProductCard product={product} key={product._id} />
          )}
        </div>
      </div>
    </section>
  );
};

export default MainProducts;
