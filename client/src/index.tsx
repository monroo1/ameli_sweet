import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import { Provider } from "react-redux";
import { persistor, store } from "./store/store";
import CreateProduct from "./components/admin/product/CreateProduct";
import Login from "./components/Login";
import Register from "./components/Register";
import ProductPage from "./pages/productPage/ProductPage";
import PersonalPage from "./pages/personalPage/PersonalPage";
import { PersistGate } from "redux-persist/integration/react";
import AdminPage from "./pages/adminPage/AdminPage";
import {
  CategoryCreate,
  CategoryList,
} from "./components/admin/category/Category";
import { FillingCreate, FillingList } from "./components/admin/filling/Filling";
import { ProductList } from "./components/admin/product/ProductList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "create", element: <CreateProduct /> },
      { path: "login", element: <Login /> },
      { path: "registration", element: <Register /> },
      { path: "product/:productId", element: <ProductPage /> },
      { path: "lk", element: <PersonalPage /> },
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
