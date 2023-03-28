import React, { FC } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";

export const PrivateRoute: FC<any> = ({ to = "/login", children }) => {
  const { isAuth } = useAppSelector((state) => state.authReducer);
  console.log(isAuth);
  return !!isAuth ? children : <Navigate to={to} replace />;
};

export const AdminRoute: FC<any> = ({ to = "/", children }) => {
  const { role } = useAppSelector((state) => state.authReducer);
  console.log(role);
  return role === "admin" ? children : <Navigate to={to} replace />;
};
