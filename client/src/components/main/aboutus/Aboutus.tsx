import { FC, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper";

import about from "../../../images/about.jpg";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import "./mainAboutus.scss";

const AboutUs: FC = () => {
  const [slide, setSlide] = useState(0);
  const [thumbsSwiper, setThumbsSwiper]: any = useState(null);

  return (
    <section className="aboutus">
      <div className="aboutus-content wrapper">
        <h2>О нас</h2>
        <div className="aboutus-content--container">
          <div className="aboutus-content--image">
            <img src={about} alt="about" />
          </div>
          <div className="aboutus-content--slider">
            <div className="">
              <Swiper
                spaceBetween={150}
                navigation={false}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                slidesPerView={1}
                className="aboutus-content--slider-content"
                onSlideChange={(e) => setSlide(e.activeIndex)}
              >
                <SwiperSlide>
                  <div className="aboutus-content--slider-slide">
                    <h3>Кондитерские изделия </h3>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Magni consequatur in ea dicta. At quisquam dolore ad
                      fugiat recusandae odit obcaecati.
                    </p>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="aboutus-content--slider-slide">
                    <h3>Кондитерские изделия 2</h3>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Magni consequatur in ea dicta. At quisquam dolore ad
                      fugiat recusandae odit obcaecati.
                    </p>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="aboutus-content--slider-slide">
                    <h3>Кондитерские изделия 3</h3>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Magni consequatur in ea dicta. At quisquam dolore ad
                      fugiat recusandae odit obcaecati.
                    </p>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>

            <div className="aboutus-content--slider-thumbs">
              <Swiper
                onSwiper={setThumbsSwiper}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[Thumbs]}
                slidesPerView={3}
                id="swiper-thumbs"
              >
                <SwiperSlide style={{ width: "auto" }}>
                  <button
                    className={
                      slide === 0
                        ? "aboutus-content--slider-thumbs-btn first active"
                        : "aboutus-content--slider-thumbs-btn first"
                    }
                    onClick={() => setSlide(0)}
                  >
                    Первый
                  </button>
                </SwiperSlide>
                <SwiperSlide style={{ width: "auto" }}>
                  <button
                    className={
                      slide === 1
                        ? "aboutus-content--slider-thumbs-btn second active"
                        : "aboutus-content--slider-thumbs-btn second"
                    }
                    onClick={() => setSlide(1)}
                  >
                    Второй
                  </button>
                </SwiperSlide>
                <SwiperSlide style={{ width: "auto" }}>
                  <button
                    className={
                      slide === 2
                        ? "aboutus-content--slider-thumbs-btn third active"
                        : "aboutus-content--slider-thumbs-btn third"
                    }
                    onClick={() => setSlide(2)}
                  >
                    Третий
                  </button>
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
