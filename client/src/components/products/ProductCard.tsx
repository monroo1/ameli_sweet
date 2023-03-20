import { Link } from "react-router-dom";
import { IProduct } from "../../models/Product";

import "./products.scss";
import { API_URL } from "../../store/indexService";

const ProductCard = (item: IProduct) => {
  return (
    <Link to={"/product/" + item._id}>
      <div className="card">
        <div className="card-image card-image--hover">
          <img src={API_URL + item.images[0]?.href} />
          <div className="card-background card-background--hover">
            <button className="button-big">Узнать больше</button>
          </div>
        </div>
        <div className="card-info card-info--hover">
          <p>{item.name}</p>
          <div className="card-info--price">
            {item.promoPrice > 0 ? (
              <div>
                <p>{item.price} ₽</p>
                <span>{item.promoPrice} ₽</span>
              </div>
            ) : (
              <span>{item.price} ₽</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
