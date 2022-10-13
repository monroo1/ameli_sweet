import react from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { useLogoutMutation, useGetUsersMutation } from "../services/AuthService";
import { setLogout } from "../store/reducers/AuthSlice";

const Header = () => {
  const dispatch = useAppDispatch();
  const {name} = useAppSelector(state => state.authReducer)

  const [logout, {isLoading: isLoadingLogout}] = useLogoutMutation();
  const [users, {isLoading: isLoadingUsers}] = useGetUsersMutation();

  const handleClickUsers = async () => {
    try {
      const res = await users({}).unwrap();
      console.log(res)
    }
    catch (e) {
    }
  };

  const handleClickLogout = async () => {
    try {
      await logout({}).unwrap();
      dispatch(setLogout())
    }
    catch (e) {
    }
  }

  return <div className="h-[75px] bg-[#FDECED]">
    <div className="max-w-screen-xl mx-auto h-full flex justify-between items-center">
      <Link to="/" onClick={handleClickUsers}>Logo</Link>
      <div className="flex gap-4">
        <div className="cursor-pointer">Корзина</div>
          {!name ? 
          <Link to="/login">Войти</Link>
          : <div onClick={handleClickLogout}>{name}</div>}
      </div>
    </div>
  </div>;
};

export default Header;
