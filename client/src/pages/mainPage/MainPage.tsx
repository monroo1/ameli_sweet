import React from "react";
import { useAppDispatch } from "../../hooks/redux";
import { useGetProductsQuery } from "../../services/ProductsService";
import { IProduct } from "../../models/Product";
import ProductCard from "../../components/products/ProductCard";

import "./mainPage.scss";

const MainPage = () => {
  const dispatch = useAppDispatch();

  const { data, isLoading } = useGetProductsQuery();

  return isLoading ? (
    <div>Загрузка</div>
  ) : (
    <div
      className="
    main-page"
    >
      <div className="products">
        {data.map((el: IProduct) => (
          <ProductCard {...el} key={el._id} />
        ))}
      </div>
    </div>
  );
};

export default MainPage;
