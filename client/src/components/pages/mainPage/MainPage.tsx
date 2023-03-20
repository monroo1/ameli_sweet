import React from "react";
import { useAppDispatch } from "../../../hooks/redux";
import { useGetAllQuery } from "../../../services/ProductsService";
import { IProduct } from "../../../models/Product";
import ProductCard from "../../products/ProductCard";

import "./mainPage.scss";

const MainPage = () => {
  const dispatch = useAppDispatch();

  const { data, isLoading } = useGetAllQuery();

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
