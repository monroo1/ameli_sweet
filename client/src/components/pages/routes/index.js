import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../../hooks/redux";

export function PrivateRoute({ to = "/login", children }) {
  const { isAuth } = useAppSelector((state) => state.authReducer);
  console.log(isAuth);
  return !!isAuth ? children : <Navigate to={to} replace />;
}
