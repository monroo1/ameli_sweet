import { useEffect, useState } from "react";
import {
  useGetBasketQuery,
  usePatchItemBasketMutation,
} from "../../services/BasketService";
import { useCreateOrderMutation } from "../../services/OrderService";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useGetCategoriesQuery } from "../../services/CategoryService";
import { Button, Divider, SvgIcon } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { API_URL } from "./../../store/indexService";

import "./basket.scss";

const BasketItem = ({ item }: any) => {
  const [value, setValue] = useState(item.count);
  const { data: categories } = useGetCategoriesQuery();
  const [patchBasketItem, { isLoading }] = usePatchItemBasketMutation();

  const handleChangeCount = (val: number) => {
    if (val >= 1) {
      setValue(val);
      patchBasketItem({
        count: val,
        _id: item._id,
      });
    } else {
      let result = window.confirm(
        "Вы действительно хотите удалить товар из корзины?"
      );
      if (result) {
        setValue(0);
        patchBasketItem({
          count: 0,
          _id: item._id,
        });
      }
    }
  };

  return (
    <div className="basket-content--wrapper--item">
      <Link to={"/product/" + item.product._id}>
        <div className="basket-content--wrapper--item--img">
          <img
            src={API_URL + item.product.images[0].href}
            alt={item.product.name}
          />
        </div>
      </Link>
      <div className="basket-content--wrapper--item--content">
        <div className="basket-content--wrapper--item--content--info">
          <Link to={"/product/" + item.product._id}>
            <p className="basket-content--wrapper--item--content--info--name">
              {item.product.name}
            </p>
          </Link>
          <p className="basket-content--wrapper--item--content--info--grey">
            Начинка: {item.filling.name}
          </p>
          <p className="basket-content--wrapper--item--content--info--grey">
            Категория:{" "}
            {
              categories?.filter(
                (category) => item.product.category === category._id
              )[0].name
            }
          </p>
        </div>
        <div className="basket-content--wrapper--item--content--price">
          <div className="basket-content--wrapper--item--content--price--block">
            {item.product.promoPrice > 0 ? (
              <>
                <p className="basket-content--wrapper--item--content--price--close">
                  {item.product.price * item.count}
                  <span className="price-small">₽</span>
                </p>
                <span className="basket-content--wrapper--item--content--price--span basket-content--wrapper--item--content--price--span--red">
                  {item.product.promoPrice * item.count}
                  <span className="price-small">₽</span>
                </span>
              </>
            ) : (
              <span className="basket-content--wrapper--item--content--price--span">
                {item.product.price * item.count}
                <span className="price-small">₽</span>
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="basket-content--wrapper--item--count">
        <button
          onClick={() => handleChangeCount(value - 1)}
          disabled={isLoading}
        >
          <SvgIcon>
            <RemoveIcon />
          </SvgIcon>
        </button>
        <p>{item.count}</p>
        <button
          onClick={() => handleChangeCount(value + 1)}
          disabled={isLoading}
        >
          <SvgIcon>
            <AddIcon />
          </SvgIcon>
        </button>
      </div>
    </div>
  );
};

const Basket = () => {
  const { data } = useGetBasketQuery();
  const [create] = useCreateOrderMutation();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  const handleCreateOrder = async () => {
    const res = await create().unwrap();
    return navigate(`/create-order/${res._id}`);
  };

  const initialValue = 0;
  const initialPrice = 0;

  function morph(int: number) {
    const array: string[] = ["товар", "товара", "товаров"];
    return array[
      int % 100 > 4 && int % 100 < 20
        ? 2
        : [2, 0, 1, 1, 1, 2][int % 10 < 5 ? int % 10 : 5]
    ];
  }

  return (
    <section className="basket">
      <div className="basket-header">
        <h2>Корзина товаров</h2>
      </div>
      <div className="basket-content">
        <div className="wrapper">
          {!!data && data.length >= 1 ? (
            <div className="basket-content--wrapper">
              <div className="basket-content--wrapper--items">
                {data!.map((item: any) => (
                  <BasketItem item={item} key={item._id} />
                ))}
              </div>
              <div className="basket-content--wrapper--total">
                <Button
                  variant="contained"
                  onClick={handleCreateOrder}
                  sx={{
                    background: "#f08565",
                    paddingTop: "12px",
                    paddingBottom: "12px",
                    "&:hover": {
                      backgroundColor: "#eba793",
                    },
                    "&:active": {
                      backgroundColor: "#eba793",
                    },
                  }}
                >
                  Перейти к оформлению
                </Button>
                <div className="basket-content--wrapper--total-price">
                  <div className="basket-content--wrapper--total-price--header">
                    <p>
                      Всего:{" "}
                      <span className="number">
                        {data.reduce(
                          (accumulator, currentValue) =>
                            accumulator + currentValue.count,
                          initialValue
                        )}{" "}
                      </span>{" "}
                      {morph(
                        data.reduce(
                          (accumulator, currentValue) =>
                            accumulator + currentValue.count,
                          initialValue
                        )
                      )}{" "}
                    </p>

                    <span className="number">
                      {data.reduce(
                        (accumulator, currentValue: any) =>
                          accumulator +
                          currentValue.product.price * currentValue.count,

                        initialPrice
                      )}{" "}
                      ₽
                    </span>
                  </div>
                  <Divider />
                  {data.reduce(
                    (accumulator, currentValue: any) =>
                      accumulator + currentValue.product.promoPrice,
                    initialPrice
                  ) > 0 && (
                    <div className="basket-content--wrapper--total-price--promo">
                      <p>Скидка: </p>
                      <span className="number">
                        {"-"}
                        {data.reduce(
                          (accumulator, currentValue: any) =>
                            currentValue.product.promoPrice > 0
                              ? accumulator +
                                (currentValue.product.price -
                                  currentValue.product.promoPrice) *
                                  currentValue.count
                              : accumulator + 0,
                          initialPrice
                        )}
                        {"₽"}
                      </span>
                    </div>
                  )}

                  <div className="basket-content--wrapper--total-price--final">
                    <p>Итого</p>
                    <span className="number">
                      {data.reduce(
                        (accumulator, currentValue: any) =>
                          currentValue.product.promoPrice > 0
                            ? accumulator +
                              currentValue.product.promoPrice *
                                currentValue.count
                            : accumulator +
                              currentValue.product.price * currentValue.count,

                        initialPrice
                      )}{" "}
                      ₽
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="basket-empty">
              <h2 className="name">Сложите в корзину нужные товары</h2>
              <p>А чтобы их найти, загляните в каталог</p>
              <div className="basket-empty--btns">
                <Link to="/catalog">
                  <Button
                    variant="contained"
                    sx={{
                      background: "#f08565",

                      "&:hover": {
                        backgroundColor: "#eba793",
                      },
                      "&:active": {
                        backgroundColor: "#eba793",
                      },
                    }}
                  >
                    Каталог
                  </Button>
                </Link>
                <Link to="/">
                  <Button
                    variant="outlined"
                    sx={{
                      borderColor: "#eba793",
                      color: "#eba793",
                      "&:hover": {
                        borderColor: "#f08565",
                        color: "#f08565",
                      },
                      "&:active": {
                        borderColor: "#f08565",
                        color: "#f08565",
                      },
                    }}
                  >
                    На главную
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Basket;
