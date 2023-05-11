import { useParams } from "react-router-dom";
import { CSSProperties, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetProductQuery } from "../../services/ProductsService";
import { IFile } from "../../models/Product";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper";
import {
  Divider,
  Select,
  MenuItem,
  InputLabel,
  SelectChangeEvent,
  FormControl,
} from "@mui/material";

import { API_URL } from "../../store/indexService";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import "./productPage.scss";
import { useGetCategoriesQuery } from "../../services/CategoryService";
import { useGetFillingsQuery } from "../../services/FillingService";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setFillingBasketItem } from "../../store/reducers/BasketSlice";
import { Filling } from "../../store/reducers/FillingSlice";

const ProductPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { filling } = useAppSelector((state) => state.basketReducer);
  const [fillingsData, setFillingsData] = useState<Filling[]>([]);

  const [thumbsSwiper, setThumbsSwiper]: any = useState(null);
  const [tabsStatus, setTabsStatus] = useState(1);

  const { data: categoies, isFetching: fetchingCatigories } =
    useGetCategoriesQuery();
  const { data: fillings, isFetching: fetchingFillings } =
    useGetFillingsQuery();
  const { data: product, isFetching: fetchingProduct } =
    useGetProductQuery(productId);

  useEffect(() => {
    if (!product && !fetchingProduct) {
      navigate("/");
    }
  }, [fetchingProduct]);

  useEffect(() => {
    if (fillings && !fetchingFillings && product && !fetchingProduct) {
      const arr: Filling[] = [];
      product.fillings.map((filling) =>
        fillings.filter((el) => filling === el._id && arr.push(el))
      );
      setFillingsData(arr);
    }
  }, [fetchingFillings, fetchingProduct]);

  const handleChange = (event: SelectChangeEvent) => {
    dispatch(setFillingBasketItem(event.target.value));
  };

  useEffect(() => {
    return () => {
      dispatch(setFillingBasketItem(""));
    };
  }, []);

  return product ? (
    <div className="product">
      <h2 className="product-title">{product.name}</h2>
      <div className="product-tabs">
        <button
          className={tabsStatus === 1 ? "product-tabs--active" : ""}
          onClick={() => setTabsStatus(1)}
        >
          Конфигурация
        </button>
        <button
          className={tabsStatus === 2 ? "product-tabs--active" : ""}
          onClick={() => setTabsStatus(2)}
        >
          Дополнительная информация
        </button>
      </div>
      <Divider variant="middle" />
      <div className="product-content">
        <div className="product-content--galary">
          <Swiper
            style={
              {
                marginBottom: 20 + "px",
                "--swiper-navigation-color": "#fff",
                "--swiper-pagination-color": "#fff",
              } as CSSProperties
            }
            spaceBetween={10}
            navigation={true}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper2"
          >
            {product.images.map((el: IFile, i: number) => (
              <SwiperSlide key={i}>
                <div className="product-content--galary--big">
                  <img src={API_URL + el.href} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <Swiper
            onSwiper={setThumbsSwiper}
            slidesPerView={product.images.length}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper"
          >
            {product.images.map((el: IFile, i: number) => (
              <SwiperSlide
                key={i}
                style={{
                  width: "auto",
                }}
              >
                <div className="product-content--galary--small">
                  <img src={API_URL + el.href} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        {tabsStatus === 1 ? (
          <div className="product-content--info">
            {product.promoPrice !== 0 ? (
              <h3 className="product-content--info-price-promo">
                {product.promoPrice} ₽ <span>{product.price} ₽ </span>
              </h3>
            ) : (
              <h3 className="product-content--info-price">{product.price} ₽</h3>
            )}
            <FormControl sx={{ mt: 2, mb: 2, width: 300 }}>
              <InputLabel id="demo-simple-select-label">
                Выберите начинку
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={filling}
                label="Выберите начинку"
                onChange={handleChange}
              >
                {fillingsData.map((filling) => (
                  <MenuItem key={filling._id} value={filling._id}>
                    {filling.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <p>{product.description}</p>
          </div>
        ) : (
          <div className="product-content--info">Описание</div>
        )}
      </div>
    </div>
  ) : (
    <div>Загрузка</div>
  );
};

export default ProductPage;
