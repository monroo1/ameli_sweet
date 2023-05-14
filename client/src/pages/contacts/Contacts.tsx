import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { BsInstagram } from "react-icons/bs";
import { BsTelegram } from "react-icons/bs";
import { BsWhatsapp } from "react-icons/bs";

import "./contacts.scss";

const ContactsPage = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return (
    <section className="contacts">
      <div className="contacts-header">
        <h2>Контактная информация</h2>
      </div>
      <div className="wrapper" style={{ display: "flex" }}>
        <div className="contacts-content">
          <div className="contacts-content--addres">
            <h3>Ичмелян Ирина Витальевна</h3>
            <p className="addres">
              г. Сочи, жилой район Адлер улица Бестужева, 10
            </p>
            <p className="phone">8 (902) 407-45-13</p>
            <a href="mailto:ameli-cake@mail.ee">ameli-cake@mail.ee</a>
          </div>
          <div className="contacts-content--social">
            <h3>Социальные сети</h3>
            <a
              href="https://instagram.com/ameli_sweet_cake?igshid=NTc4MTIwNjQ2YQ=="
              rel="noreferrer"
            >
              <span>Instagram</span> <BsInstagram size={22} />
            </a>
            <a href="https://t.me/ameli_sweet_cake1" rel="noreferrer">
              <span>Telegram</span> <BsTelegram size={22} />
            </a>
            <a href="https://wa.me/79024074513" rel="noreferrer">
              <span>Whatsapp</span> <BsWhatsapp size={22} />
            </a>
          </div>
        </div>
      </div>
      <YMaps>
        <Map
          width="100%"
          height="400px"
          defaultState={{
            center: [43.419297, 39.922658],
            zoom: 13,
            controls: ["zoomControl", "fullscreenControl"],
          }}
          modules={["control.ZoomControl", "control.FullscreenControl"]}
        >
          <Placemark
            modules={["geoObject.addon.balloon"]}
            defaultGeometry={[43.419297, 39.922658]}
            properties={{
              balloonContentBody:
                "г. Сочи, жилой район Адлер, улица бестужева 10",
            }}
          />
        </Map>
      </YMaps>
      ;
    </section>
  );
};

export default ContactsPage;
