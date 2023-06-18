import React from "react";
import {
  List,
  ListSubheader,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Collapse,
} from "@mui/material";
import {
  ExpandLess,
  ExpandMore,
  Cake,
  Category,
  Balcony,
  ControlPoint,
  FormatListNumbered,
  PersonOutline,
  DeliveryDining,
} from "@mui/icons-material";

import "./adminPage.scss";
import { Routes, Route, Link } from "react-router-dom";
import CreateProduct from "../../components/admin/product/CreateProduct";
import {
  CategoryCreate,
  CategoryList,
} from "../../components/admin/category/Category";
import {
  FillingCreate,
  FillingList,
} from "../../components/admin/filling/Filling";
import { ProductList } from "../../components/admin/product/ProductList";
import OrderList from "../../components/admin/orders/OrderList";
import OrderPageAdmin from "../../components/admin/orders/Order";

const AdminPage = () => {
  const [category, setCategory] = React.useState(false);
  const [product, setProduct] = React.useState(false);
  const [filling, setFilling] = React.useState(false);

  return (
    <div className="admin ">
      <div className="admin-wrapper wrapper">
        <List
          sx={{ width: "100%", maxWidth: 300, bgcolor: "background.paper" }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Панель администратора
            </ListSubheader>
          }
        >
          <ListItemButton
            onClick={() => {
              setFilling(false);
              setCategory(false);
              setProduct(!product);
            }}
          >
            <ListItemIcon>
              <Cake />
            </ListItemIcon>
            <ListItemText primary="Товары" />
            {product ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={product} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Link to="product/create">
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <ControlPoint />
                  </ListItemIcon>
                  <ListItemText primary="Создать" />
                </ListItemButton>
              </Link>
              <Link to="product/list">
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <FormatListNumbered />
                  </ListItemIcon>
                  <ListItemText primary="Список" />
                </ListItemButton>
              </Link>
            </List>
          </Collapse>
          <ListItemButton
            onClick={() => {
              setProduct(false);
              setCategory(false);
              setFilling(!filling);
            }}
          >
            <ListItemIcon>
              <Balcony />
            </ListItemIcon>
            <ListItemText primary="Начинки" />
            {filling ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={filling} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Link to="filling/create">
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <ControlPoint />
                  </ListItemIcon>
                  <ListItemText primary="Создать" />
                </ListItemButton>
              </Link>
              <Link to="filling/list">
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <FormatListNumbered />
                  </ListItemIcon>
                  <ListItemText primary="Список" />
                </ListItemButton>
              </Link>
            </List>
          </Collapse>
          <ListItemButton
            onClick={() => {
              setFilling(false);
              setProduct(false);
              setCategory(!category);
            }}
          >
            <ListItemIcon>
              <Category />
            </ListItemIcon>
            <ListItemText primary="Категории" />
            {category ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={category} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Link to="category/create">
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <ControlPoint />
                  </ListItemIcon>
                  <ListItemText primary="Создать" />
                </ListItemButton>
              </Link>
              <Link to="category/list">
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <FormatListNumbered />
                  </ListItemIcon>
                  <ListItemText primary="Список" />
                </ListItemButton>
              </Link>
            </List>
          </Collapse>
          <Link to="orders">
            <ListItemButton>
              <ListItemIcon>
                <DeliveryDining />
              </ListItemIcon>
              <ListItemText primary="Заказы" />
            </ListItemButton>
          </Link>
          {/* <ListItemButton>
            <ListItemIcon>
              <PersonOutline />
            </ListItemIcon>
            <ListItemText primary="Пользователи" />
          </ListItemButton> */}
        </List>
        <div className="admin-content">
          <Routes>
            <Route path="product/create" element={<CreateProduct />} />
            <Route path="product/list" element={<ProductList />} />
            <Route path="category/create" element={<CategoryCreate />} />
            <Route path="category/list" element={<CategoryList />} />
            <Route path="filling/create" element={<FillingCreate />} />
            <Route path="filling/list" element={<FillingList />} />
            <Route path="orders" element={<OrderList />} />
            <Route path="order/:id" element={<OrderPageAdmin />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
