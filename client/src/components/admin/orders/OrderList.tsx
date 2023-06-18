import { Link } from "react-router-dom";
import {
  communications,
  payments,
  stages,
} from "../../../utils/lists-data/status";
import {
  useGetOrdersQuery,
  usePatchOrderStatusMutation,
} from "../../../services/OrderService";
import { Button } from "@mui/material";
import { API_URL } from "../../../store/indexService";
import { IOrder } from "../../../utils/interface/order";
import dayjs from "dayjs";
import uuid from "react-uuid";
import "dayjs/locale/ru";

import "./orders.scss";

const OrderListItem = ({ order }: { order: IOrder }) => {
  const initialValue = 0;

  function morph(int: number) {
    const array: string[] = ["товар", "товара", "товаров"];
    return array[
      int % 100 > 4 && int % 100 < 20
        ? 2
        : [2, 0, 1, 1, 1, 2][int % 10 < 5 ? int % 10 : 5]
    ];
  }

  const [patchStatus, { isLoading }] = usePatchOrderStatusMutation();

  const handleEndOrder = async (id: string) => {
    const confirm = window.confirm(
      "Звершить заказ? Убедитесь, что клиент оплатил полную сумму товара, и он был успешно ему доставлен."
    );
    if (confirm) {
      const res = await patchStatus({ id, newStatus: 4 }).unwrap();
      console.log(res);
    } else {
      return;
    }
  };

  return (
    <div className="order-item">
      <div className="order-item--wrapper">
        <div className="order-item--content">
          <div className="order-item--content--info">
            <p className="order-item--content--title">
              Заказ{" "}
              <span className="number">
                {dayjs(new Date(order.date)).format("DD.MM.YYYY HH:mm")}
              </span>
            </p>
            <div
              className="order-item--content--status"
              style={{ backgroundColor: stages[order.status].color }}
            >
              {stages[order.status].name}
            </div>
            <p>Cпособ оплаты: {order.payments ? payments[1] : payments[0]}</p>
            {order.status < 2 && (
              <p className="order-item--content--communication">
                Cпособ связи "{communications[order.communication]}" по номеру
                телефона <span className="number">{order.phoneNumber}</span>
              </p>
            )}
          </div>
        </div>
        <div className="order-item--products">
          {order.items.map((product) => (
            <Link to={"/product/" + product.product._id} key={product._id}>
              <div className="order-item--products--item">
                <img
                  src={API_URL + product.product.images[0].href}
                  alt={product.product.name}
                />
                <div>
                  {" "}
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
                (accumulator, currentValue) => accumulator + currentValue.count,
                initialValue
              )}{" "}
            </span>
            {morph(
              order.items.reduce(
                (accumulator, currentValue) => accumulator + currentValue.count,
                initialValue
              )
            )}
            <span style={{ fontWeight: "bold" }}> · </span>
            <span className="number">{order.cost}</span> ₽
          </p>
        </div>
      </div>
      <div className="order-item--btns">
        {order.status === 1 && (
          <Link to={"/admin/order/" + order._id}>
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
        {order.status === 3 && (
          <Button
            variant="contained"
            size="small"
            disabled={isLoading}
            onClick={() => handleEndOrder(order._id)}
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
            Завершить
          </Button>
        )}
      </div>
    </div>
  );
};

const OrderList = () => {
  const { data: orders, isLoading: isLoadingOrders } = useGetOrdersQuery();

  return !!orders && !isLoadingOrders ? (
    <div className="order-admin">
      <h3>Заказы</h3>
      <div className="order-admin--content">
        {orders.map((order: IOrder) => (
          <OrderListItem order={order} key={uuid()} />
        ))}
      </div>
    </div>
  ) : (
    <div>Загрузка...</div>
  );
};

export default OrderList;
