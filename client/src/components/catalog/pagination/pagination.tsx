import Pagination from "@mui/material/Pagination";
import ProductCard from "../../product/ProductCard";
import { IProduct } from "../../../utils/interface/product";

import "./pagination.scss";

const CatalogPagination = ({
  products,
  currentPage,
  handleChangePage,
}: {
  products: IProduct[];
  currentPage: number;
  handleChangePage: any;
}) => {
  const pageSize = 9;

  const pagesCount = Math.ceil(products.length / pageSize);
  const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);
  const words = [" товар", " товара", " товаров"];

  function num_word(value: number, words: string[]) {
    value = Math.abs(value) % 100;
    var num = value % 10;

    if (value > 10 && value < 20) {
      return value + " " + words[2];
    }
    if (num > 1 && num < 5) {
      return value + " " + words[1];
    }
    if (num === 1) {
      return value + " " + words[0];
    }
    return value + " " + words[2];
  }

  const startIndex = (currentPage - 1) * pageSize;

  const paginatedProducts = products.slice(startIndex, startIndex + pageSize);

  return (
    <div className="pagination">
      <div className="pagination-results">
        Найдено {num_word(products.length, words)}
      </div>
      <section className="pagination-products">
        {paginatedProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </section>
      {products.length > 9 && (
        <div className="pagination-control">
          <Pagination
            count={pages.length}
            page={currentPage}
            onChange={handleChangePage}
          />
        </div>
      )}
    </div>
  );
};

export default CatalogPagination;
