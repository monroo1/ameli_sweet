import { Link } from "react-router-dom";
import { API_URL } from "../../store/indexService";
import { IProduct } from "../../utils/interface/product";

import "./productCard.scss";

const ProductCard = ({ product }: { product: IProduct }) => {
  return (
    <Link to={"/product/" + product._id}>
      <div className="card">
        <div className="card-image card-image--hover">
          <img src={API_URL + product.images[0]?.href} />
          <div className="card-background card-background--hover">
            <button className="button-big">Узнать больше</button>
          </div>
        </div>
        <div className="card-info card-info--hover">
          <p>{product.name}</p>
          <div className="card-info--price">
            {product.promoPrice > 0 ? (
              <div>
                <p>{product.price} ₽</p>
                <span className="card-info--price-promo">
                  от {product.promoPrice} ₽
                </span>
              </div>
            ) : (
              <span>от {product.price} ₽</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
