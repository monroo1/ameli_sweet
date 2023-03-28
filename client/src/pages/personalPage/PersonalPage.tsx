import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import {
  useLogoutMutation,
  useGetUsersMutation,
} from "../../services/AuthService";
import { setLogout } from "../../store/reducers/AuthSlice";

const PersonalPage = () => {
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.authReducer);
  const [logout, { isLoading: isLoadingLogout }] = useLogoutMutation();
  const [users, { isLoading: isLoadingUsers }] = useGetUsersMutation();

  const handleClickUsers = async () => {
    try {
      const res = await users({}).unwrap();
      console.log(res);
    } catch (e) {}
  };

  const handleClickLogout = async () => {
    try {
      await logout({}).unwrap();
      dispatch(setLogout());
    } catch (e) {}
  };

  return (
    <div>
      <h3>Имя: {user.name}</h3>
      <p>Почта: {user.email}</p>
      <p>Телефон: {user.phone}</p>
      <p>Статус: {user.isAuth ? "Подтвержден" : "Не подтвержден"}</p>
      <button onClick={handleClickLogout}>Выйти</button>
      <div>
        <p>Получить пользователей:</p>
        <button onClick={handleClickUsers}>Загрузить</button>
      </div>
    </div>
  );
};

export default PersonalPage;
