import { useLocation, useParams } from "react-router-dom";
import { CSSProperties, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetProductQuery } from "../../services/ProductsService";
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
import { useGetCategoriesQuery } from "../../services/CategoryService";
import { useGetFillingsQuery } from "../../services/FillingService";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  setCountBasketItem,
  setFillingBasketItem,
} from "../../store/reducers/BasketSlice";
import { API_URL } from "../../store/indexService";
import ContentLoader from "react-content-loader";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "./productPage.scss";
import { useAddItemBasketMutation } from "../../services/BasketService";
import { IFilling } from "../../utils/interface/filling";
import { IFile } from "../../utils/interface/file";

const EventsLoader = (props: any) => (
  <div className="wrapper">
    <ContentLoader
      width="100%"
      height={500}
      viewBox="0 0 700 300"
      backgroundColor="#f5f5f5"
      foregroundColor="#dbdbdb"
      {...props}
    >
      <rect x="4" y="8" rx="3" ry="3" width="7" height="288" />
      <rect x="6" y="289" rx="3" ry="3" width="669" height="8" />
      <rect x="670" y="9" rx="3" ry="3" width="6" height="285" />
      <rect x="55" y="42" rx="16" ry="16" width="274" height="216" />
      <rect x="412" y="113" rx="3" ry="3" width="102" height="7" />
      <rect x="402" y="91" rx="3" ry="3" width="178" height="6" />
      <rect x="405" y="139" rx="3" ry="3" width="178" height="6" />
      <rect x="416" y="162" rx="3" ry="3" width="102" height="7" />
      <rect x="405" y="189" rx="3" ry="3" width="178" height="6" />
      <rect x="5" y="8" rx="3" ry="3" width="669" height="7" />
      <rect x="406" y="223" rx="14" ry="14" width="72" height="32" />
      <rect x="505" y="224" rx="14" ry="14" width="72" height="32" />
      <rect x="376" y="41" rx="3" ry="3" width="231" height="29" />
    </ContentLoader>
  </div>
);

const ProductPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { filling } = useAppSelector((state) => state.basketReducer);
  const basket = useAppSelector((state) => state.basketReducer);
  const { isAuth } = useAppSelector((state) => state.authReducer);

  const [thumbsSwiper, setThumbsSwiper]: any = useState(null);
  const [fillingsData, setFillingsData] = useState<IFilling[]>([]);
  const [category, setCategory] = useState("");
  const [errorFilling, setErrorFilling] = useState(false);

  const width = window.innerWidth;

  const [addProduct, { isLoading }] = useAddItemBasketMutation();

  const { data: categoies, isFetching: fetchingCategories } =
    useGetCategoriesQuery();
  const { data: fillings, isFetching: fetchingFillings } =
    useGetFillingsQuery();
  const { data: product, isFetching: fetchingProduct } = useGetProductQuery(
    productId!
  );

  useEffect(() => {
    if (!product && !fetchingProduct) {
      navigate("/catalog");
    }
  }, [fetchingProduct]);

  useEffect(() => {
    if (product && !fetchingProduct && !fetchingCategories && categoies) {
      setCategory(
        categoies.filter(
          (el: { _id: string; name: string }) => product.category === el._id
        )[0].name
      );
    }
  }, [fetchingCategories, fetchingProduct]);

  useEffect(() => {
    if (fillings && !fetchingFillings && product && !fetchingProduct) {
      const arr: IFilling[] = [];
      product.fillings.map((filling: IFilling) =>
        fillings.filter((el: any) => filling === el._id && arr.push(el))
      );
      setFillingsData(arr);
    }
  }, [fetchingFillings, fetchingProduct]);

  const handleChange = (event: SelectChangeEvent) => {
    dispatch(setFillingBasketItem(event.target.value));
  };

  const handleChangeCount = (value: any) => {
    dispatch(setCountBasketItem(value));
  };

  const handleAddItemToCart = async () => {
    if (!isAuth) {
      return navigate("/signin");
    }
    if (fillingsData.length > 0 && !basket.filling) {
      return setErrorFilling(true);
    }
    if (fillingsData.length > 0 && !!basket.filling) {
      setErrorFilling(false);
      await addProduct({
        product: product!._id,
        filling: basket.filling,
        count: basket.count,
      });
    }
    if (fillingsData.length === 0) {
      await addProduct({
        product: product!._id,
        filling: "642ae9499ab5f5c2160cb95e",
        count: basket.count,
      });
    }
  };

  useEffect(() => {
    return () => {
      dispatch(setFillingBasketItem(""));
    };
  }, []);

  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return product ? (
    <div className="product wrapper">
      <div className="product-content">
        <div className="product-content--galary">
          <Swiper
            style={
              {
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
                  <img src={API_URL + el.href} alt="product small" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <Swiper
            direction={"vertical"}
            onSwiper={setThumbsSwiper}
            slidesPerView={width <= 1280 ? 4 : 5}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper"
          >
            {product.images.map((el: IFile, i: number) => (
              <SwiperSlide key={i}>
                <div className="product-content--galary--small">
                  <img src={API_URL + el.href} alt="product big" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="product-content--info">
          <h2 className="product-title">{product.name}</h2>
          {product.promoPrice !== 0 ? (
            <h3 className="product-content--info-price-promo">
              <span>{product.price} ₽ </span> {product.promoPrice} ₽
            </h3>
          ) : (
            <h3 className="product-content--info-price">{product.price} ₽</h3>
          )}
          <p className="product-content--info-desc">{product.description}</p>
          <Divider style={{ width: 100 + "%" }} />
          <div className="product-content--category">
            Категория: <span>{category}</span>
          </div>
          {fillingsData.length !== 0 && (
            <FormControl sx={{ mt: 2, mb: 2, width: 300 }}>
              <InputLabel id="demo-simple-select-label" error={errorFilling}>
                Выберите начинку
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={filling}
                label="Выберите начинку"
                onChange={handleChange}
                error={errorFilling}
              >
                {fillingsData.map((filling) => (
                  <MenuItem key={filling._id} value={filling._id}>
                    {filling.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          <div className="product-content-add">
            <div className="product-content--count">
              <input
                type="number"
                value={basket.count}
                onChange={(e) => handleChangeCount(e.target.value)}
                disabled
              />
              <div>
                <button
                  onClick={() => handleChangeCount(basket.count + 1)}
                  disabled={isLoading}
                >
                  +
                </button>
                <button
                  onClick={() =>
                    basket.count - 1 >= 1 && handleChangeCount(basket.count - 1)
                  }
                  disabled={isLoading}
                >
                  -
                </button>
              </div>
            </div>
            <button
              className="add-item"
              onClick={handleAddItemToCart}
              disabled={isLoading}
            >
              Добавить в корзину
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <EventsLoader />
  );
};

export default ProductPage;
