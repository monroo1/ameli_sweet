import { FC } from "react";
import { BsWhatsapp, BsInstagram, BsTelegram } from "react-icons/bs";

import "./footer.scss";
import { Link } from "react-router-dom";

const Footer: FC = () => {
  return (
    <footer className="footer">
      <div className="footer-menu wrapper">
        <div className="footer-menu--home">
          <h4>Главная</h4>
          <ul>
            <Link to="/">
              <li>Категории</li>
            </Link>
            <Link to="/">
              <li>О нас</li>
            </Link>
            <Link to="/">
              <li>Товары</li>
            </Link>
            <Link to="/">
              <li>Почему именно мы</li>
            </Link>
          </ul>
        </div>
        <div className="footer-menu--shop">
          <h4>Каталог</h4>
          <ul>
            <Link to="/catalog?category=64295faa3c3722ddca7e8b18">
              <li>Бенто</li>
            </Link>
            <Link to="/catalog?category=6422c9a01aff927fcfc0c8e5">
              <li>Торты 1 кг</li>
            </Link>
            <Link to="/catalog?category=6422c747ef7838855c91e7c6">
              <li>Торты от 2 кг</li>
            </Link>
            <Link to="/catalog?category=645e4e96efe4fbc545fa97f6">
              <li>Десерты</li>
            </Link>
          </ul>
        </div>
        <div className="footer-menu--addres">
          <h4>Контактная информация</h4>
          <ul>
            <Link to="/contacts">
              <li>Адрес</li>
            </Link>
            <Link to="/contacts">
              <li>Контактные данные</li>
            </Link>
            <Link to="/contacts">
              <li>Социальные сети</li>
            </Link>
            <Link to="/contacts">
              <li>Карта</li>
            </Link>
          </ul>
          <div className="footer-menu--addres-social">
            <a
              href="https://instagram.com/ameli_sweet_cake?igshid=NTc4MTIwNjQ2YQ=="
              rel="noreferrer"
            >
              <BsInstagram
                size={28}
                color="rgb(21, 21, 21)"
                className="footer-icon"
              />
            </a>
            <a href="https://wa.me/79024074513" rel="noreferrer">
              <BsWhatsapp
                size={28}
                color="rgb(21, 21, 21)"
                className="footer-icon"
              />
            </a>
            <a href="https://t.me/ameli_sweet_cake1" rel="noreferrer">
              <BsTelegram
                size={28}
                color="rgb(21, 21, 21)"
                className="footer-icon"
              />
            </a>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        &#169; 2023. Ameli sweet cake. Все права защищены.
      </div>
    </footer>
  );
};

export default Footer;
