import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import "./App.css";
import { useAppDispatch } from "./hooks/redux";
import { useRefreshQuery } from "./services/AuthService";
import { setUser } from "./store/reducers/AuthSlice";
import MainPage from "./pages/main/MainPage";
import ProductPage from "./pages/product/ProductPage";
import PersonalPage from "./pages/profile/profile";
import { AdminRoute, PrivateRoute } from "./components/routes";
import AdminPage from "./pages/admin/AdminPage";
import Footer from "./components/footer/Footer";
import Catalog from "./pages/catalog/catalog";
import SignupPage from "./pages/signup/Signup";
import SigninPage from "./pages/signin/Signin";
import ContactsPage from "./pages/contacts/Contacts";
import Basket from "./pages/basket/basket";
import { CreateOrderPage } from "./pages/create-order/CreateOrder";

function App() {
  const dispatch = useAppDispatch();

  const [skip, setSkip] = useState(true);
  const { data } = useRefreshQuery({}, { skip });

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
          <Route path="signup" element={<SignupPage />} />
          <Route path="signin" element={<SigninPage />} />
          <Route path="product/:productId" element={<ProductPage />} />
          <Route path="catalog" element={<Catalog />} />
          <Route path="contacts" element={<ContactsPage />} />
          <Route
            path="basket"
            element={
              <PrivateRoute>
                <Basket />
              </PrivateRoute>
            }
          />
          <Route
            path="create-order/:id"
            element={
              <PrivateRoute>
                <CreateOrderPage />
              </PrivateRoute>
            }
          />
          <Route
            path="profile"
            element={
              <PrivateRoute>
                <PersonalPage />
              </PrivateRoute>
            }
          />
          <Route
            path="admin/*"
            element={
              <AdminRoute>
                <AdminPage />
              </AdminRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
