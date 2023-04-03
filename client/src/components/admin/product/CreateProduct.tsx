import {
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Fab,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useEffect } from "react";
import { useDownloadMutation } from "../../../services/FileService";
import { useCreateProductMutation } from "../../../services/ProductsService";
import {
  setProductChange,
  setProductImages,
  setProductImagesDelete,
  setProductImagesDnd,
} from "../../../store/reducers/ProductSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { API_URL } from "../../../store/indexService";
import React from "react";

import "./createProduct.scss";
import { AddImages } from "../../addImages/AddImages";

const CreateProduct = () => {
  const product = useAppSelector((state) => state.productReducer);
  const dispatch = useAppDispatch();

  const [create, { isLoading: createLoading }] = useCreateProductMutation();

  const fetchCreateProduct = async () => {
    const res = await create({
      name: product.name,
      price: product.price,
      promoPrice: product.promoPrice,
      description: product.description,
      isStock: product.isStock,
      quantityInStock: product.count,
      images: product.images,
    }).unwrap();
  };

  return (
    <div className="create">
      <div className="create-form">
        <TextField
          label="Название"
          variant="outlined"
          value={product.name}
          onChange={(e) =>
            dispatch(setProductChange({ value: e.target.value, key: "name" }))
          }
        />
        <TextField
          label="Цена"
          variant="outlined"
          type="number"
          value={product.price}
          onChange={(e) => {
            dispatch(
              setProductChange({ value: +e.target.value, key: "price" })
            );
          }}
        />
        <TextField
          label="Акционная цена"
          variant="outlined"
          type="number"
          value={product.promoPrice}
          onChange={(e) => {
            dispatch(
              setProductChange({ value: +e.target.value, key: "promoPrice" })
            );
          }}
        />
        <TextField
          label="Описание"
          variant="outlined"
          value={product.description}
          onChange={(e) =>
            dispatch(
              setProductChange({ value: e.target.value, key: "description" })
            )
          }
        />
        <FormControlLabel
          control={
            <Checkbox
              value={product.isStock}
              onChange={(e) =>
                dispatch(
                  setProductChange({ value: !product.isStock, key: "isStock" })
                )
              }
            />
          }
          label="Есть в наличии?"
        />

        {product.isStock && (
          <TextField
            label="Кол-во в наличии"
            variant="outlined"
            type="number"
            value={product.count}
            onChange={(e) => {
              dispatch(
                setProductChange({ value: +e.target.value, key: "count" })
              );
            }}
          />
        )}

        <Button variant="contained" onClick={fetchCreateProduct}>
          Сохранить
        </Button>
      </div>
      <AddImages
        addImage={setProductImages}
        removeImage={setProductImagesDelete}
        moveImage={setProductImagesDnd}
        data={product.images}
      />
    </div>
  );
};

export default CreateProduct;
