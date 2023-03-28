import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import { Provider } from "react-redux";
import { persistor, store } from "./store/store";
import CreateProduct from "./components/CreateProduct";
import Login from "./components/Login";
import Register from "./components/Register";
import ProductPage from "./pages/productPage/ProductPage";
import PersonalPage from "./pages/personalPage/PersonalPage";
import { PersistGate } from "redux-persist/integration/react";

// const store = setupStore();
// const persistor = setupPersistor();

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
