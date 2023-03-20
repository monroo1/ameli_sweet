import { useParams } from "react-router-dom";
import { CSSProperties, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetFromIdQuery } from "../../../services/ProductsService";
import { IFile } from "../../../models/Product";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper";
import { Divider } from "@mui/material";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import "./productPage.scss";
import { API_URL } from "../../../store/indexService";

const ProductPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [thumbsSwiper, setThumbsSwiper]: any = useState(null);
  const [tabsStatus, setTabsStatus] = useState(1);

  const { data, isFetching } = useGetFromIdQuery(productId);

  useEffect(() => {
    if (!data && !isFetching) {
      navigate("/");
    }
  }, [isFetching]);

  return data ? (
    <div className="product">
      <h2 className="product-title">{data.name}</h2>
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
            {data.images.map((el: IFile, i: number) => (
              <SwiperSlide key={i}>
                <div className="product-content--galary--big">
                  <img src={API_URL + el.href} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <Swiper
            onSwiper={setThumbsSwiper}
            slidesPerView={data.images.length}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper"
          >
            {data.images.map((el: IFile, i: number) => (
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
          <div className="product-content--info">Конфигурация</div>
        ) : (
          <div className="product-content--info">
            Описание
            <p>{data.description}</p>
          </div>
        )}
      </div>
    </div>
  ) : (
    <div>Загрузка</div>
  );
};

export default ProductPage;
