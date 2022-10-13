import react, {useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import { useLoginMutation } from "../services/AuthService";
import { useAppDispatch,useAppSelector } from "../hooks/redux";
import { setUser, setError } from "../store/reducers/AuthSlice";
import { UserRegisterResponse } from "../models/User";

const Login = () => {
  const dispatch = useAppDispatch();
  const {isAuth, error} = useAppSelector(state => state.authReducer)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login, {isLoading}] = useLoginMutation();
  
  const handleClick = async () => {
    try {
      const fetchLogin: UserRegisterResponse = await login({email, password}).unwrap();
      dispatch(setUser(fetchLogin));
    } catch (e: any) {
      dispatch(setError(e.data.message));
    }

  };

  return (!isAuth ? <div className="flex flex-col items-center w-1/6 gap-5 mx-auto mt-6">
  <h1>Авторизация</h1>
  {error ? <p>{error}</p> : <></>}
    <TextField
      id="reg-email"
      label="email"
      variant="outlined"
      type="email"
      value={email}
      onChange={(event) => setEmail(event.target.value)}
      className="w-full"
    />
    <TextField
      id="reg-password"
      label="Пароль"
      variant="outlined"
      type="password"
      value={password}
      onChange={(event) => setPassword(event.target.value)}
      className="w-full"
    />
    <div className="flex justify-between w-full">
      <p>Еще не зарегистрированы?</p> 
       <Link to="/registration">
        <Button variant="outlined" size="small">
          Sign up
        </Button>
      </Link>
    </div>
    <Button onClick={handleClick} variant="contained">
      Войти
    </Button>
  
</div> : <Navigate to={'/'} />)
  
};

export default Login;
