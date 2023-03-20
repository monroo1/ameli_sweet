import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Header from "./components/header/Header";
import "./App.css";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { useRefreshQuery } from "./services/AuthService";
import { setUser } from "./store/reducers/AuthSlice";
import CreateProduct from "./components/CreateProduct";
import MainPage from "./components/pages/mainPage/MainPage";
import ProductPage from "./components/pages/productPage/ProductPage";
import PersonalPage from "./components/pages/personalPage/PersonalPage";
import { PrivateRoute } from "./components/pages/routes";

function App() {
  const dispatch = useAppDispatch();

  const [skip, setSkip] = useState(true);
  const { data, isLoading } = useRefreshQuery({}, { skip });

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setSkip(false);
    }
  }, []);

  useEffect(() => {
    if (data) {
      setSkip(true);
      dispatch(setUser(data));
    }
  }, [data]);

  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="registration" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="create" element={<CreateProduct />} />
          <Route path="product/:productId" element={<ProductPage />} />
          <Route
            path="lk"
            element={
              <PrivateRoute>
                <PersonalPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
