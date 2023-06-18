import { useEffect } from "react";
import { Button } from "@mui/material";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { useLogoutMutation } from "../../services/AuthService";
import {
  useCheckPaymentOrderMutation,
  useGetOrdersUserQuery,
  usePatchOrderMutation,
  usePaymentOrderMutation,
} from "../../services/OrderService";
import { setLogout } from "../../store/reducers/AuthSlice";
import { AiOutlineCheck } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { Link, useLocation, useNavigate } from "react-router-dom";
import uuid from "react-uuid";
import dayjs from "dayjs";
import { IOrder } from "../../utils/interface/order";
import { API_URL } from "../../store/indexService";
import {
  communications,
  payments,
  stages,
} from "../../utils/lists-data/status";

import "dayjs/locale/ru";

import "./profile.scss";

const PersonalPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.authReducer);
  const [logout] = useLogoutMutation();
  const { data: orders, isLoading } = useGetOrdersUserQuery();

  const [pay, { isLoading: isLoadingPay }] = usePaymentOrderMutation();
  const [patchOrder, { isLoading: isLoadingPatchOrder }] =
    usePatchOrderMutation();
  const [checkPaymentOrder] = useCheckPaymentOrderMutation();

  function morph(int: number) {
    const array: string[] = ["товар", "товара", "товаров"];
    return array[
      int % 100 > 4 && int % 100 < 20
        ? 2
        : [2, 0, 1, 1, 1, 2][int % 10 < 5 ? int % 10 : 5]
    ];
  }

  const handlePayOrder = async ({
    id,
    price,
    description,
  }: {
    id: string;
    price: number;
    description: string;
  }) => {
    const res = await pay({ id }).unwrap();
    sessionStorage.setItem("paymentId", res.id);
    await patchOrder({
      ...orders!.filter((order: IOrder) => order._id === id)[0],
      paymentId: res.id,
    });

    if (!!res) {
      window.location.href = res.confirmation.confirmation_url;
    }
  };

  const initialValue = 0;

  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  const handleClickLogout = async () => {
    try {
      await logout({}).unwrap();
      dispatch(setLogout());
    } catch (e) {}
  };

  useEffect(() => {
    const paymentId: string | null = sessionStorage.getItem("paymentId");
    if (!!paymentId) {
      const handleCheckPaymentOrder = async () => {
        const res = await checkPaymentOrder(paymentId).unwrap();
        console.log(res);
      };
      handleCheckPaymentOrder();
    }
  }, []);

  return (
    <div className="profile">
      <div className="profile-content wrapper">
        <div className="profile-content--info">
          <h3>Профиль</h3>
          <h4>Имя: {user.name}</h4>
          <div
            className={
              user.isActivated
                ? "profile-content--info-mail"
                : "profile-content--info-mail red"
            }
          >
            Почта: <span>{user.email} </span>
            {user.isActivated ? (
              <AiOutlineCheck color="#2e7d32" />
            ) : (
              <RxCross2 color="#d32f2f" />
            )}
          </div>
          <p>
            Телефон: <span className="phone">{user.phone}</span>
          </p>
          <p>Количество заказов: {orders?.length}</p>
          <Button onClick={handleClickLogout} variant="outlined">
            Выйти
          </Button>
        </div>

        <div className="profile-content--orders">
          {!!orders && !isLoading ? (
            <>
              {orders.map((order: IOrder) => (
                <div key={uuid()} className="order-item">
                  <div className="order-item--wrapper">
                    <div className="order-item--content">
                      <div className="order-item--content--info">
                        <p className="order-item--content--title">
                          Заказ{" "}
                          <span className="number">
                            {dayjs(new Date(order.date)).format(
                              "DD.MM.YYYY HH:mm"
                            )}
                          </span>
                        </p>
                        <div
                          className="order-item--content--status"
                          style={{
                            backgroundColor: stages[order.status].color,
                          }}
                        >
                          {stages[order.status].name}
                        </div>
                        <p>
                          Cпособ оплаты:{" "}
                          {order.payments ? payments[1] : payments[0]}
                        </p>
                        {order.status < 2 && (
                          <p className="order-item--content--communication">
                            Cпособ связи "{communications[order.communication]}"
                            по номеру телефона{" "}
                            <span className="number">{order.phoneNumber}</span>
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="order-item--products">
                      {order.items.map((product) => (
                        <Link
                          to={"/product/" + product.product._id}
                          key={product._id}
                        >
                          <div className="order-item--products--item">
                            <img
                              src={API_URL + product.product.images[0].href}
                              alt={product.product.name}
                            />
                            <div>
                              <p>{product.count}</p>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                    <div className="order-item--total">
                      <p>
                        <span className="number">
                          {order.items.reduce(
                            (accumulator, currentValue) =>
                              accumulator + currentValue.count,
                            initialValue
                          )}{" "}
                        </span>
                        {morph(
                          order.items.reduce(
                            (accumulator, currentValue) =>
                              accumulator + currentValue.count,
                            initialValue
                          )
                        )}
                        <span style={{ fontWeight: "bold" }}> · </span>
                        <span className="number">{order.cost}</span> ₽
                      </p>
                    </div>
                  </div>
                  <div className="order-item--btns">
                    {order.status === 2 && (
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() =>
                          handlePayOrder({
                            id: order._id,
                            price: order.cost,
                            description: `Заказ ${order._id}`,
                          })
                        }
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
                        Оплатить
                      </Button>
                    )}
                    {order.status === 0 && (
                      <Link to={`/create-order/${order._id}`}>
                        <Button
                          variant="contained"
                          size="small"
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
                          Уточнить детали
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              ))}
              <h3>Мои заказы</h3>
            </>
          ) : (
            <p>Список заказов пуст</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalPage;
