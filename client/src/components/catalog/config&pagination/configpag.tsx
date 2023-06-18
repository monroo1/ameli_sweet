import { useEffect, useState } from "react";
import CatalogConfigurated from "../configurated/configurated";
import CatalogPagination from "../pagination/pagination";
import { useLocation, useSearchParams } from "react-router-dom";
import { IProduct } from "../../../utils/interface/product";

import "./configpag.scss";

const CatalogConfigpag = ({ products }: { products: IProduct[] }) => {
  let [searchParams] = useSearchParams();
  const { pathname } = useLocation();
  const categoryQuery = searchParams.get("category");

  const minmin = 0;
  let count = products.length;
  let bentoCount = 0;
  let desertsCount = 0;
  let cake1Count = 0;
  let cake2Count = 0;
  let maxmax = 0;

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname, categoryQuery]);

  products.map((product) => {
    if (product.promoPrice !== 0) {
      if (product.promoPrice > maxmax) {
        maxmax = product.promoPrice;
      }
    } else {
      if (product.price > maxmax) {
        maxmax = product.price;
      }
    }
    if (product.category === "64295faa3c3722ddca7e8b18") {
      bentoCount++;
    }
    if (product.category === "6422c9a01aff927fcfc0c8e5") {
      cake1Count++;
    }
    if (product.category === "6422c747ef7838855c91e7c6") {
      cake2Count++;
    }
    if (product.category === "645e4e96efe4fbc545fa97f6") {
      desertsCount++;
    }
  });

  const [value, setValue] = useState("");
  const [minNum, setMinNum] = useState(0);
  const [maxNum, setMaxNum] = useState(maxmax);
  const [priceRangeValue, setPriceRangeValue] = useState([0, maxmax]);
  const [productsFiltred, setProductsFiltred] = useState(products);

  useEffect(() => {
    if (categoryQuery === "64295faa3c3722ddca7e8b18") {
      setValue("64295faa3c3722ddca7e8b18");
    } else if (categoryQuery === "6422c9a01aff927fcfc0c8e5") {
      setValue("6422c9a01aff927fcfc0c8e5");
    } else if (categoryQuery === "6422c747ef7838855c91e7c6") {
      setValue("6422c747ef7838855c91e7c6");
    } else if (categoryQuery === "645e4e96efe4fbc545fa97f6") {
      setValue("645e4e96efe4fbc545fa97f6");
    }
  }, [categoryQuery]);

  const productFiltredCategoies = productsFiltred.filter((product) => {
    if (value === "") {
      return product;
    } else {
      if (value === product.category) {
        return product;
      }
    }
  });

  const handlePressFiltredPrice = () => {
    setProductsFiltred(
      products.filter((product) => {
        if (product.promoPrice !== 0) {
          if (
            product.promoPrice >= priceRangeValue[0] &&
            product.promoPrice <= priceRangeValue[1]
          ) {
            return product;
          }
        } else {
          if (
            product.price >= priceRangeValue[0] &&
            product.price <= priceRangeValue[1]
          ) {
            return product;
          }
        }
      })
    );
  };

  const [currentPage, setCurrentPage] = useState(1);
  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    if (currentPage > 1) {
      setCurrentPage(1);
    }
  }, [value]);

  return (
    <div className="catalog">
      <div className="wrapper catalog-content">
        <CatalogConfigurated
          count={count}
          desertsCount={desertsCount}
          bentoCount={bentoCount}
          cake1Count={cake1Count}
          cake2Count={cake2Count}
          handlePressFiltredPrice={handlePressFiltredPrice}
          minmin={minmin}
          maxmax={maxmax}
          value={value}
          setValue={setValue}
          minNum={minNum}
          setMinNum={setMinNum}
          maxNum={maxNum}
          setMaxNum={setMaxNum}
          priceRangeValue={priceRangeValue}
          setPriceRangeValue={setPriceRangeValue}
        />
        <CatalogPagination
          products={productFiltredCategoies}
          currentPage={currentPage}
          handleChangePage={handleChangePage}
        />
      </div>
    </div>
  );
};

export default CatalogConfigpag;
