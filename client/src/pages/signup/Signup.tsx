import { FC, useState, useEffect } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import { useRegistrationMutation } from "../../services/AuthService";
import { UserAuthResponse } from "../../models/User";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setError, setUser } from "../../store/reducers/AuthSlice";

import "../signin/auth.scss";

const SignupPage: FC = () => {
  const { isAuth, error } = useAppSelector((state) => state.authReducer);
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState(7);
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const [registration, { isLoading }] = useRegistrationMutation();

  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  const handleClick = async () => {
    if (password === rePassword && password !== "") {
      setPasswordError(false);
      try {
        const fetchRegistration: UserAuthResponse = await registration({
          email,
          name,
          phone,
          password,
          role: "user",
        }).unwrap();
        dispatch(setUser(fetchRegistration));
      } catch (e: any) {
        dispatch(setError(e.data.message));
      }
    } else {
      setPasswordError(true);
    }
  };

  return !isAuth ? (
    <div className="auth">
      <div className="auth-bg"></div>
      <div className="auth-content">
        <div className="auth-content-block">
          <h3>Регистрация</h3>
          {!!error && (
            <p className="auth-error">
              Ошибка при регистрации, проверьте данные
            </p>
          )}
          <TextField
            id="reg-email"
            label="email"
            variant="outlined"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <TextField
            id="reg-name"
            label="Имя"
            variant="outlined"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <TextField
            id="reg-phone"
            label="Телефон"
            variant="outlined"
            type="tel"
            value={phone || 7}
            onChange={(event) => setPhone(parseInt(event.target.value))}
          />
          <TextField
            error={passwordError}
            id="reg-password"
            label="Пароль"
            variant="outlined"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <TextField
            error={passwordError}
            id="reg-password"
            label="Подтверждение пароля"
            variant="outlined"
            type="password"
            value={rePassword}
            onChange={(event) => setRePassword(event.target.value)}
          />
          <div className="auth-btns">
            <div>
              <p>Уже зарегистрированы?</p>
              <Link to="/signin">
                <Button variant="outlined" size="small">
                  Sign in
                </Button>
              </Link>
            </div>
            <Button
              variant="contained"
              onClick={handleClick}
              disabled={isLoading}
            >
              Зарегистрироваться
            </Button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Navigate to={"/"} />
  );
};

export default SignupPage;
