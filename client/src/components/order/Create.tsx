import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  setDelivery,
  setCommunication,
  setPayment,
  setPhoneNumber,
  setDate,
} from "../../store/reducers/OrderSlice";
import {
  useDeleteOrderMutation,
  usePatchOrderMutation,
} from "../../services/OrderService";
import dayjs from "dayjs";
import "dayjs/locale/ru";
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
import { MuiTelInput } from "mui-tel-input";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { IOrderItem } from "../../utils/interface/order";
import { API_URL } from "./../../store/indexService";
import { useGetCategoriesQuery } from "../../services/CategoryService";
import { ICategory } from "../../utils/interface/category";

import "./order.scss";

const ProductCardOrder = ({
  item,
  categories,
}: {
  item: IOrderItem;
  categories: ICategory[];
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
        <div className="create-order--product--content--bottom">
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

export const CreateOrder = ({
  isLoadingOrder,
}: {
  isLoadingOrder: boolean;
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const orderSelected = useAppSelector((state) => state.orderReducer);
  const { data: categories, isLoading: isLoadingCategoies } =
    useGetCategoriesQuery();
  const [saveOrder, { isLoading: isLoadingPatchOrder }] =
    usePatchOrderMutation();
  const [deleteOrder, { isLoading: isLoadingDeleteOrder }] =
    useDeleteOrderMutation();

  const handleChangeDelivery = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setDelivery(event.target.value === "false" ? false : true));
  };

  const handleChangeCommunication = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(setCommunication(parseInt(event.target.value)));
  };

  const handleChangePayment = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setPayment(event.target.value === "false" ? false : true));
  };

  const handleChangePhone = (newValue: string) => {
    dispatch(setPhoneNumber(newValue));
  };

  const handleChangeDate = (newDate: any) => {
    dispatch(setDate(newDate.$d.toString()));
  };

  const handleSaveOrder = async () => {
    await saveOrder({ ...orderSelected, status: 1 }).unwrap();
  };

  const handleDeleteOrder = async () => {
    const confirm = window.confirm("Вы действительно хотить отменить заказ?");
    if (confirm) {
      await deleteOrder(orderSelected._id).unwrap();
      return navigate("/profile");
    } else {
      return;
    }
  };

  useEffect(() => {
    if (!isLoadingOrder && orderSelected.status !== 0) {
      navigate("/profile");
    }
  }, [isLoadingOrder, orderSelected]);

  return !orderSelected._id && isLoadingOrder ? (
    <div>Загрузка...</div>
  ) : (
    <div className="create-order">
      <div className="create-order--header">
        <h2>Оформление заказа</h2>
      </div>
      <div className="wrapper">
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
                При выборе "Доставка курьером", стоимость доставки
                рассчитывается исходя из фактического тарифа "Яндекс доставки" и
                оплачивается отдельно от заказа.<br></br> Дотсавка производится
                только по "Большому Сочи".
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
                При выборе варианта "Предоплата 50%", остальная часть
                оплачивается при получении товара, наличными или переводом.
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl>
              <FormLabel
                id="radio-buttons-group-phone"
                style={{ marginBottom: 10 + "px" }}
              >
                Номер телефона:
              </FormLabel>
              <MuiTelInput
                aria-labelledby="radio-buttons-group-phone"
                fullWidth
                value={orderSelected.phoneNumber}
                onChange={handleChangePhone}
              />
              <FormHelperText style={{ marginTop: 10 + "px" }}>
                Номер телефона для связи администратора с заказчиком.
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl>
              <FormLabel id="radio-buttons-group-communication">
                Предпочитаемый способ связи:
              </FormLabel>
              <RadioGroup
                aria-labelledby="radio-buttons-group-communication"
                name="controlled-radio-buttons-group"
                value={orderSelected.communication}
                onChange={handleChangeCommunication}
              >
                <FormControlLabel
                  value={0}
                  control={
                    <Radio
                      sx={{
                        "&, &.Mui-checked": {
                          color: "#EBA793",
                        },
                      }}
                    />
                  }
                  label="Телеграмм"
                />
                <FormControlLabel
                  value={1}
                  control={
                    <Radio
                      sx={{
                        "&, &.Mui-checked": {
                          color: "#EBA793",
                        },
                      }}
                    />
                  }
                  label="WhatsApp"
                />
                <FormControlLabel
                  value={2}
                  control={
                    <Radio
                      sx={{
                        "&, &.Mui-checked": {
                          color: "#EBA793",
                        },
                      }}
                    />
                  }
                  label="Телефонный звонок"
                />
              </RadioGroup>
              <FormHelperText>
                При выборе варианта "Telegram", убедитесь, чтобы ваши настройки
                приватности позволяли отправить вам сообщение.
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl>
              <FormLabel style={{ marginBottom: 2 + "px" }}>
                Выберите дату:
              </FormLabel>
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale="ru"
              >
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
              <h3 className="create-order--products--title">
                Товары в заказе:
              </h3>
            </Grid>
            {orderSelected.items.map((element: IOrderItem) => (
              <Grid item xs={12} key={element._id}>
                <ProductCardOrder item={element} categories={categories} />
              </Grid>
            ))}
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
            Cохранить
          </Button>
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
    </div>
  );
};
