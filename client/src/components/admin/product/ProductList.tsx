import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../../../services/ProductsService";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper";
import { API_URL } from "../../../store/indexService";
import { IFile, IProduct } from "../../../models/Product";

import "./productList.scss";
import { CSSProperties } from "react";
import { Button, Divider } from "@mui/material";
import { useGetCategoriesQuery } from "../../../services/CategoryService";
import { useGetFillingsQuery } from "../../../services/FillingService";
import { useAppDispatch } from "../../../hooks/redux";
import { setProduct } from "../../../store/reducers/ProductSlice";
import { useNavigate } from "react-router-dom";

export const ProductList = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { data: productsData, isLoading } = useGetProductsQuery();
  const { data: categoiesData } = useGetCategoriesQuery();
  const { data: fillingsData } = useGetFillingsQuery();
  const [deleteProduct] = useDeleteProductMutation();

  const handleDeleteProduct = async (id: string) => {
    if (window.confirm("Подвердите удаление товара")) {
      deleteProduct(id);
    }
  };

  const handlePatchProduct = (product: IProduct) => {
    dispatch(setProduct(product));
    navigate("/admin/product/create");
  };

  return isLoading ? (
    <div>загрузка...</div>
  ) : (
    <div className="product-list">
      {productsData.map((product: IProduct, i: number) => (
        <div className="product-list--item" key={i}>
          <div className="product-list--item-content">
            <div>
              <h2>
                Название: <span className="title">{product.name}</span>
              </h2>
              <p>Описание: {product.description}</p>
              <p>
                Цена: <span className="price">{product.price}</span>
              </p>
              {!!product.promoPrice && (
                <p>
                  Акционная цена:
                  <span className="price">{product.promoPrice}</span>
                </p>
              )}
              {product.isStock ? (
                <p>
                  Есть в наличии: <span className="price">Да</span>
                </p>
              ) : (
                <p>
                  Есть в наличии: <span className="price">Нет</span>
                </p>
              )}
              {product.quantityInStock > 0 && (
                <p>Колличество в наличии: {product.quantityInStock}</p>
              )}
              <p>
                Категория:{" "}
                {!!categoiesData
                  ? categoiesData.filter(
                      (el: any) => el._id === product.category
                    )[0].name
                  : "Загрузка"}
              </p>

              <ul>
                <p>Начинки:</p>
                {product.fillings.map((el: string, index: number) => (
                  <li key={index}>
                    {!!fillingsData
                      ? fillingsData.filter(
                          (filling: any) => filling._id === el
                        )[0].name
                      : "Загрузка"}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <Button
                variant="contained"
                onClick={() => handlePatchProduct(product)}
              >
                Изменить
              </Button>
              <Button
                variant="outlined"
                onClick={() => handleDeleteProduct(product._id)}
              >
                Удалить
              </Button>
            </div>
          </div>
          <div className="product-list--item-images">
            <Swiper
              style={
                {
                  "--swiper-navigation-color": "#fff",
                  "--swiper-pagination-color": "#fff",
                  "--swiper-navigation-size": 33 + "px",
                } as CSSProperties
              }
              spaceBetween={10}
              navigation={true}
              modules={[FreeMode, Navigation]}
              className="mySwiper4"
            >
              {product.images.map((el: IFile, ind: number) => (
                <SwiperSlide key={ind}>
                  <div className="product-list--item-images--el">
                    <img src={API_URL + el.href} alt={el.name} />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      ))}
    </div>
  );
};
