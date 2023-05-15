import { useEffect, useState } from "react";
import {
  useGetBasketQuery,
  usePatchItemBasketMutation,
} from "../../services/BasketService";

import logo from "../../images/bento.jpg";

import "./basket.scss";
import { useLocation } from "react-router-dom";

const BasketItem = ({ el }: any) => {
  const [value, setValue] = useState(el.count);

  const [patchBasketItem, { isLoading }] = usePatchItemBasketMutation();

  const handleChangeCount = (val: number) => {
    if (val >= 1) {
      setValue(val);
      patchBasketItem({
        count: val,
        _id: el._id,
      });
    } else {
      let result = window.confirm(
        "Вы действительно хотите удалить товар из корзины?"
      );
      if (result) {
        setValue(0);
        patchBasketItem({
          count: 0,
          _id: el._id,
        });
      }
    }
  };

  return (
    <div className="basket-table--content--item" key={el._id}>
      <div className="name">
        <div>
          <img src={logo} alt="logo" />
        </div>
        <div>
          <p>{el.product.name}</p>
          <p>
            Начинка: <span>{el.filling.name}</span>
          </p>
        </div>
      </div>
      <div className="price">
        <p>
          {el.product.promoPrice > 0 ? el.product.promoPrice : el.product.price}{" "}
          ₽
        </p>
      </div>
      <div className="count">
        {isLoading ? (
          <div>...Загрузка</div>
        ) : (
          <>
            <button
              onClick={() => handleChangeCount(value - 1)}
              disabled={isLoading}
            >
              -
            </button>
            <input type="number" value={value} disabled />
            <button
              onClick={() => handleChangeCount(value + 1)}
              disabled={isLoading}
            >
              +
            </button>
          </>
        )}
      </div>
      <div className="total">
        <p>
          {el.product.promoPrice > 0
            ? el.product.promoPrice * el.count
            : el.product.price * el.count}{" "}
          ₽
        </p>
      </div>
    </div>
  );
};

const Basket = () => {
  const { data, isFetching } = useGetBasketQuery();

  let cost = 0;

  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return (
    <section className="basket">
      <div className="basket-header">
        <h2>Корзина товаров</h2>
      </div>
      <div className="basket-content">
        <div className="wrapper">
          <div className="basket-table">
            <div className="basket-table--header">
              <div className="name">Продукт</div>
              <div className="price">Цена</div>
              <div className="count">Количество</div>
              <div className="total">Всего</div>
            </div>
            <div className="basket-table--content">
              {!!data ?
                (data!.map((el: any) => {
                  cost += el.product.promoPrice > 0
                          ? el.product.promoPrice * el.count
                          : el.product.price * el.count;;
                  return (
                    <BasketItem
                      el={el}
                      key={el._id}
                    />
                  )
                }
              )) : <div>Корзина пуста.</div>
              }
            </div>
          </div>
          <div className="basket-order">
            <div>
            <p>Всего:</p>
            <span>{cost} ₽</span>
            </div>
            <button>Оформить заказ</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Basket;
