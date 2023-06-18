import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { useGetCategoriesQuery } from "../../../services/CategoryService";
import {
  usePatchOrderMutation,
  useGetOrderUserQuery,
  usePatchOrderStatusMutation,
} from "../../../services/OrderService";
import {
  setDelivery,
  setPayment,
  setDate,
  setOrder,
} from "../../../store/reducers/OrderSlice";
import dayjs from "dayjs";
import { ICategory } from "../../../utils/interface/category";
import { IOrderItem } from "../../../utils/interface/order";
import { API_URL } from "../../../store/indexService";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import {
  FormHelperText,
  FormLabel,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  Grid,
  Button,
} from "@mui/material";

import "dayjs/locale/ru";

import "./orders.scss";
import { communications } from "../../../utils/lists-data/status";

const ProductCardOrder = ({
  item,
  categories,
}: //   handleDeleteProduct,
{
  item: IOrderItem;
  categories: ICategory[];
  //   handleDeleteProduct: ({ item }: { item: IOrderItem }) => any;
}) => {
  return (
    <div className="create-order--product">
      <div className="create-order--product--image">
        <img src={API_URL + item.product.images[0].href} />
      </div>
      <div className="create-order--product--content">
        <h4 className="create-order--product--content--title">
          {item.product.name}
        </h4>
        <p className="create-order--product--content--p">
          Начинка:{" "}
          <span className="create-order--product--content--span">
            {item.filling.name}
          </span>
        </p>
        <p className="create-order--product--content--p">
          Категория:{" "}
          <span className="create-order--product--content--span">
            {
              categories.filter((el) => el._id === item.product.category)[0]
                .name
            }
          </span>
        </p>
        <p className="create-order--product--content--p">
          Цена:{" "}
          <span className="create-order--product--content--span create-order--product--content--span-number">
            {item.product.promoPrice > 0
              ? item.product.promoPrice + " ₽"
              : item.product.price + " ₽"}
          </span>
        </p>
        <p className="create-order--product--content--p">
          Коллиечество:{" "}
          <span className="create-order--product--content--span create-order--product--content--span-number">
            {item.count}
          </span>
        </p>
        <div className="create-order--product--content--bottom create-order--product--content--bottom-admin">
          {/* <Button
            variant="outlined"
            onClick={() => handleDeleteProduct({ item })}
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
            Удалить товар
          </Button> */}
          <p className="create-order--product--content--p">
            Итоговая цена:{" "}
            <span className="create-order--product--content--total">
              {item.product.promoPrice > 0
                ? item.product.promoPrice * item.count + " ₽"
                : item.product.price * item.count + " ₽"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

const OrderPageAdmin = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const orderSelected = useAppSelector((state) => state.orderReducer);

  const { id } = useParams();

  const { data: order, isLoading: isLoadingOrder } = useGetOrderUserQuery(id!);

  const { data: categories, isLoading: isLoadingCategoies } =
    useGetCategoriesQuery();
  const [saveOrder, { isLoading: isLoadingPatchOrder }] =
    usePatchOrderMutation();
  const [patchStatusOrder, { isLoading: isLoadingPatchStatusOrder }] =
    usePatchOrderStatusMutation();

  const handleChangeDelivery = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setDelivery(event.target.value === "false" ? false : true));
  };

  const handleChangePayment = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setPayment(event.target.value === "false" ? false : true));
  };

  const handleChangeDate = (newDate: any) => {
    dispatch(setDate(newDate.$d.toString()));
  };

  //TODO сделать удаление продукта, добавление нового, а также его изменение, пока что если пользователя что-то ьбудет неустраивать при подветрждении то его нужно отменить и заказчик будет создавать заказ заново

  //   const handleDeleteProduct = async ({ item }: { item: IOrderItem }) => {
  //
  //     const res = await saveOrder({
  //       ...orderSelected,
  //       items: orderSelected.items.filter(
  //         (element: IOrderItem) => element._id !== item._id
  //       ),
  //     }).unwrap();
  //     dispatch(setOrder(res));
  //   };

  const handleSaveOrder = async () => {
    const confirm = window.confirm(
      "Подтверждение заказа, вы уточнили все детали и клиент согласен со всеми аспектами? После подтверждения статус изменится на Ожидает оплаты."
    );
    if (confirm) {
      await saveOrder({ ...orderSelected, status: 2 }).unwrap();
      return navigate("/admin/orders");
    } else {
      return;
    }
  };

  const handleDeleteOrder = async () => {
    const confirm = window.confirm("Вы действительно хотить отменить заказ?");
    if (confirm) {
      await patchStatusOrder({ id: orderSelected._id, newStatus: 5 }).unwrap();
      return navigate("/admin/orders");
    } else {
      return;
    }
  };

  useEffect(() => {
    console.log(orderSelected);
  }, [orderSelected]);

  return !orderSelected._id && isLoadingOrder ? (
    <div>Загрузка...</div>
  ) : (
    <div>
      <Grid container spacing={3} alignItems="flex-start">
        <Grid item xs={12}>
          <FormControl>
            <FormLabel id="radio-buttons-group-delivery">
              Вариант доставки:
            </FormLabel>
            <RadioGroup
              aria-labelledby="radio-buttons-group-delivery"
              name="controlled-radio-buttons-group"
              value={orderSelected.delivery}
              onChange={handleChangeDelivery}
            >
              <FormControlLabel
                value={false}
                control={
                  <Radio
                    sx={{
                      "&, &.Mui-checked": {
                        color: "#EBA793",
                      },
                    }}
                  />
                }
                label="Самовывоз"
              />
              <FormControlLabel
                value={true}
                control={
                  <Radio
                    sx={{
                      "&, &.Mui-checked": {
                        color: "#EBA793",
                      },
                    }}
                  />
                }
                label="Доставка курьером"
              />
            </RadioGroup>
            <FormHelperText>
              При выборе "Доставка курьером", стоимость доставки рассчитывается
              исходя из фактического тарифа "Яндекс доставки" и оплачивается
              отдельно от заказа.<br></br> Дотсавка производится только по
              "Большому Сочи".
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl>
            <FormLabel id="radio-buttons-group-payment">
              Предпочитаемый способ оплаты:
            </FormLabel>
            <RadioGroup
              aria-labelledby="radio-buttons-group-payment"
              name="controlled-radio-buttons-group"
              value={orderSelected.payments}
              onChange={handleChangePayment}
            >
              <FormControlLabel
                value={false}
                control={
                  <Radio
                    sx={{
                      "&, &.Mui-checked": {
                        color: "#EBA793",
                      },
                    }}
                  />
                }
                label="Предоплата 50%"
              />
              <FormControlLabel
                value={true}
                control={
                  <Radio
                    sx={{
                      "&, &.Mui-checked": {
                        color: "#EBA793",
                      },
                    }}
                  />
                }
                label="Предоплата 100%"
              />
            </RadioGroup>
            <FormHelperText>
              При выборе варианта "Предоплата 50%", остальная часть оплачивается
              при получении товара, наличными или переводом.
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          Номер телефона: {orderSelected.phoneNumber}
        </Grid>
        <Grid item xs={12}>
          Способ связи: {communications[orderSelected.communication]}
        </Grid>
        <Grid item xs={12}>
          <FormControl>
            <FormLabel style={{ marginBottom: 2 + "px" }}>
              Выберите дату:
            </FormLabel>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
              <DemoContainer components={["DateTimePicker"]}>
                <DemoItem>
                  <DateTimePicker
                    defaultValue={dayjs(new Date(orderSelected.date))}
                    onChange={handleChangeDate}
                  />
                </DemoItem>
              </DemoContainer>
            </LocalizationProvider>
            <FormHelperText style={{ marginTop: 10 + "px" }}>
              Дата к которой должен быть готов ваш заказ.
            </FormHelperText>
          </FormControl>
        </Grid>
      </Grid>
      {!!categories && !isLoadingCategoies ? (
        <Grid
          container
          spacing={3}
          alignItems="flex-start"
          className="create-order--products"
        >
          <Grid item xs={12}>
            <h3 className="create-order--products--title">Товары в заказе:</h3>
          </Grid>
          {orderSelected.items.map((element: IOrderItem) => (
            <Grid item xs={12} key={element._id}>
              <ProductCardOrder
                item={element}
                categories={categories}
                // handleDeleteProduct={handleDeleteProduct}
              />
            </Grid>
          ))}
          <Grid item xs={12}>
            Итоговая цена: {orderSelected.cost} ₽
          </Grid>
        </Grid>
      ) : (
        <></>
      )}
      <div className="order-create--btns">
        <Button
          variant="contained"
          onClick={handleSaveOrder}
          disabled={isLoadingPatchOrder}
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
          Подтвердить
        </Button>
        {/* <Button
          variant="outlined"
          //   onClick={handleSaveOrder}
          //   disabled={isLoadingPatchOrder}
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
          Добавить товар
        </Button> */}
        <Button
          variant="outlined"
          onClick={handleDeleteOrder}
          disabled={isLoadingPatchOrder}
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
          Отменить заказ
        </Button>
      </div>
    </div>
  );
};

export default OrderPageAdmin;
