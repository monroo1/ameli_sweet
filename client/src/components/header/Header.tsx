import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
import "./header.scss";

import logo from "../../images/logo.png";

const Header = () => {
  const { name } = useAppSelector((state) => state.authReducer);

  return (
    <div className="header">
      <div className="header-content">
        <div className="header-content__left">
          <Link to="/create">
            <img src={logo} />
          </Link>

          <div>Торты</div>
          <div>Десерты</div>
          <div>Акции</div>
          <div>Купить сейчас</div>
        </div>
        <div className="header-content__right">
          <div>Корзина</div>
          {!name ? (
            <Link to="/login">Войти</Link>
          ) : (
            <Link to="/lk">{name}</Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
