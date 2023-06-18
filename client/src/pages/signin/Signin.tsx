import { useState, useEffect } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useLoginMutation } from "../../services/AuthService";
import { setUser, setError } from "../../store/reducers/AuthSlice";
import { UserAuthResponse } from "../../utils/interface/user";

const SigninPage = () => {
  const dispatch = useAppDispatch();
  const { isAuth, error } = useAppSelector((state) => state.authReducer);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login, { isLoading }] = useLoginMutation();

  const handleClick = async () => {
    try {
      const fetchLogin: UserAuthResponse = await login({
        email,
        password,
      }).unwrap();
      dispatch(setUser(fetchLogin));
    } catch (e: any) {
      dispatch(setError(e.data.message));
    }
  };

  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return !isAuth ? (
    <div className="auth">
      <div className="auth-bg"></div>
      <div className="auth-content">
        <div className="auth-content-block">
          <h3>Авторизация</h3>
          {error && <p>Неверные email или пароль</p>}
          <TextField
            id="reg-email"
            label="email"
            variant="outlined"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <TextField
            id="reg-password"
            label="Пароль"
            variant="outlined"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <div className="auth-btns">
            <div>
              <p>Еще не зарегистрированы?</p>
              <Link to="/signup">
                <Button variant="outlined" size="small">
                  Sign up
                </Button>
              </Link>
            </div>
            <Button
              variant="contained"
              disabled={isLoading}
              onClick={handleClick}
            >
              Войти
            </Button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Navigate to={"/"} />
  );
};

export default SigninPage;
