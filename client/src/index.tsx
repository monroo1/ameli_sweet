import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import { Provider } from "react-redux";
import { persistor, store } from "./store/store";
import CreateProduct from "./components/admin/product/CreateProduct";
import ProductPage from "./pages/product/ProductPage";
import PersonalPage from "./pages/profile/profile";
import { PersistGate } from "redux-persist/integration/react";
import AdminPage from "./pages/admin/AdminPage";
import {
  CategoryCreate,
  CategoryList,
} from "./components/admin/category/Category";
import { FillingCreate, FillingList } from "./components/admin/filling/Filling";
import { ProductList } from "./components/admin/product/ProductList";
import Catalog from "./pages/catalog/catalog";
import SigninPage from "./pages/signin/Signin";
import SignupPage from "./pages/signup/Signup";
import ContactsPage from "./pages/contacts/Contacts";
import Basket from "./pages/basket/basket";
import { CreateOrderPage } from "./pages/create-order/CreateOrder";
import OrderList from "./components/admin/orders/OrderList";
import OrderPageAdmin from "./components/admin/orders/Order";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "create", element: <CreateProduct /> },
      { path: "signin", element: <SigninPage /> },
      { path: "signup", element: <SignupPage /> },
      { path: "product/:productId", element: <ProductPage /> },
      { path: "profile", element: <PersonalPage /> },
      { path: "catalog", element: <Catalog /> },
      { path: "contacts", element: <ContactsPage /> },
      { path: "basket", element: <Basket /> },
      { path: "create-order/:id", element: <CreateOrderPage /> },
      {
        path: "admin",
        element: <AdminPage />,
        children: [
          { path: "product/create", element: <CreateProduct /> },
          { path: "product/list", element: <ProductList /> },
          { path: "category/create", element: <CategoryCreate /> },
          { path: "category/list", element: <CategoryList /> },
          { path: "filling/create", element: <FillingCreate /> },
          { path: "filling/list", element: <FillingList /> },
          { path: "orders", element: <OrderList /> },
          { path: "order/:id", element: <OrderPageAdmin /> },
        ],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <RouterProvider router={router} />
    </PersistGate>
  </Provider>
);
