import react, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import { useAppDispatch } from "../hooks/redux";
import { useRegistrationMutation } from "../services/AuthService";
import { setError, setUser } from "../store/reducers/AuthSlice";
import { UserAuthResponse } from "../models/User";
import React from "react";

const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState(7);
  const [password, setPassword] = useState("");

  const [registration, { isLoading }] = useRegistrationMutation();

  const handleClick = async () => {
    try {
      const fetchRegistration: UserAuthResponse = await registration({
        email,
        name,
        phone,
        password,
        role: "user",
      }).unwrap();
      dispatch(setUser(fetchRegistration));
      navigate("/");
    } catch (e: any) {
      dispatch(setError(e.data.message));
    }
  };

  return (
    <div className="flex flex-col items-center w-1/6 gap-5 mx-auto mt-6">
      <h1>Регистрация</h1>
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
        id="reg-name"
        label="Имя"
        variant="outlined"
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
        className="w-full"
      />
      <TextField
        id="reg-phone"
        label="Телефон"
        variant="outlined"
        type="tel"
        value={phone || 7}
        onChange={(event) => setPhone(parseInt(event.target.value))}
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
        <p>Уже зарегистрированы?</p>
        <Link to="/login">
          <Button variant="outlined" size="small">
            Sign in
          </Button>
        </Link>
      </div>
      <Button onClick={handleClick} variant="contained">
        Зарегистрироваться
      </Button>
    </div>
  );
};

export default Register;
