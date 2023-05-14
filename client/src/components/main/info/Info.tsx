import { FC } from "react";
import "./mainInfo.scss";
import { Link } from "react-router-dom";
import Button from "../../UI/button/Button";

const MainInfo: FC = () => {
  return (
    <section className="maininfo">
      <div className="maininfo-content wrapper">
        <h1>Вкусные</h1>
        <p className="sub-title">торты для вас</p>
        <p className="description">
          Ameli Sweet Cake предлагает лучшие торты и сладости для вас.
        </p>
        <Link to="/catalog">
          <Button name="Купить" />
        </Link>
      </div>
    </section>
  );
};

export default MainInfo;
