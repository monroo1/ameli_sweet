import { useState } from "react";
import { Link } from "react-router-dom";
import { BiMap, BiCart, BiUser } from "react-icons/bi";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useLocation } from "react-router-dom";
import { useGetBasketQuery } from "../../services/BasketService";
import { useAppSelector } from "../../hooks/redux";

import logo from "../../images/logo.png";

import "./header.scss";

const Header = () => {
  const path = useLocation();

  const { isAuth } = useAppSelector((state) => state.authReducer);

  const [showBurger, setShowBurger] = useState(false);

  const toggleMenu = () => {
    setShowBurger(!showBurger);
  };

  const { data } = useGetBasketQuery();

  return (
    <header className="header">
      <div className="header-nav">
        <div className="header-nav--content wrapper">
          <div>
            <div className="header-humburger">
              <button onClick={toggleMenu}>
                <RxHamburgerMenu size={28} />
              </button>
            </div>
            <div className="header-top--logo">
              <Link to="/">
                <img src={logo} alt="logo.png" />
              </Link>
            </div>
          </div>
          <nav>
            <ul>
              <Link to="/">
                <li
                  className={
                    path.pathname === "/"
                      ? "header-nav--content-item-active"
                      : ""
                  }
                >
                  Главная
                </li>
              </Link>
              <Link to="/catalog">
                <li
                  className={
                    path.pathname === "/catalog"
                      ? "header-nav--content-item-active"
                      : ""
                  }
                >
                  Каталог
                </li>
              </Link>
              <Link to="/contacts">
                <li
                  className={
                    path.pathname === "/contacts"
                      ? "header-nav--content-item-active"
                      : ""
                  }
                >
                  Контакты
                </li>
              </Link>
            </ul>
          </nav>
          <div className="header-top--addres">
            <div className="header-top--addres-icon">
              <BiMap size={32} color="#EBA793" />
            </div>
            <div className="header-top--addres-text">
              г. Сочи, жилой район Адлер<br></br> улица Бестужева, 10
            </div>
          </div>
          <div>
            <Link to="/basket">
              <div
                className="header-basket"
                data-content={isAuth ? data?.length : ""}
              >
                <BiCart size={28} color="rgb(21, 21, 21)" />
              </div>
            </Link>
            <Link to="/profile">
              <button className="header-profile">
                <BiUser size={28} color="rgb(21, 21, 21)" />
              </button>
            </Link>
          </div>
        </div>
        <div className={showBurger ? "burger burger-show" : "burger"}>
          <div className="burger-close">
            <button onClick={toggleMenu}>
              <IoCloseCircleOutline size={24} />
            </button>
          </div>
          <div className="burger-nav">
            <nav>
              <ul>
                <Link to="/">
                  <li className="burger-nav--link" onClick={toggleMenu}>
                    Главная
                  </li>
                </Link>
                <Link to="/catalog">
                  <li className="burger-nav--link" onClick={toggleMenu}>
                    Каталог
                  </li>
                </Link>
                <Link to="/contacts">
                  <li className="burger-nav--link" onClick={toggleMenu}>
                    Контакты
                  </li>
                </Link>
              </ul>
            </nav>
            <div className="burger-nav--addres">
              <div className="header-top--addres-icon">
                <BiMap size={32} color="#EBA793" />
              </div>
              <div className="header-top--addres-text">
                г. Сочи<br></br> жилой район Адлер<br></br> улица Бестужева, 10
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
