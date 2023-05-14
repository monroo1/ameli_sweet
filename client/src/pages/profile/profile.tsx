import { useEffect } from "react";
import { Button } from "@mui/material";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { useLogoutMutation } from "../../services/AuthService";
import { setLogout } from "../../store/reducers/AuthSlice";
import { AiOutlineCheck } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { useLocation } from "react-router-dom";

import "./profile.scss";

const PersonalPage = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.authReducer);
  const [logout] = useLogoutMutation();

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
          <p>Количество заказов: 0</p>
          <Button onClick={handleClickLogout} variant="outlined">
            Выйти
          </Button>
        </div>
        <div className="profile-content--orders">
          <p>Список заказов пуст</p>
        </div>
      </div>
    </div>
  );
};

export default PersonalPage;
