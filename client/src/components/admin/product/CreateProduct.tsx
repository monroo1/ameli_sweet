import {
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Autocomplete,
} from "@mui/material";
import { useCreateProductMutation } from "../../../services/ProductsService";
import {
  setProductChange,
  setProductImages,
  setProductImagesDelete,
  setProductImagesDnd,
  setProductCategory,
  setProductFillings,
} from "../../../store/reducers/ProductSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { AddImages } from "../../addImages/AddImages";
import { useGetFillingsQuery } from "../../../services/FillingService";
import { useGetCategoriesQuery } from "../../../services/CategoryService";
import { Filling } from "../../../store/reducers/FillingSlice";

import "./createProduct.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const {
    name,
    price,
    promoPrice,
    description,
    isStock,
    count,
    images,
    category,
    fillings,
  } = useAppSelector((state) => state.productReducer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [create, { isLoading: createLoading }] = useCreateProductMutation();
  const { data: fillingsData } = useGetFillingsQuery();
  const { data: categoiesData } = useGetCategoriesQuery();

  const fetchCreateProduct = async () => {
    const res = await create({
      name: name,
      price: price,
      promoPrice: promoPrice,
      description: description,
      isStock: isStock,
      quantityInStock: count,
      images: images,
      category: category,
      fillings: fillings,
    }).unwrap();
    return navigate(`/product/${res._id}`);
  };

  return (
    <div className="create">
      <div className="create-form">
        <TextField
          label="Название товара"
          variant="outlined"
          value={name}
          onChange={(e) =>
            dispatch(setProductChange({ value: e.target.value, key: "name" }))
          }
        />
        <TextField
          label="Цена"
          variant="outlined"
          type="number"
          value={price}
          onChange={(e) => {
            dispatch(setProductChange({ value: e.target.value, key: "price" }));
          }}
        />
        <TextField
          label="Акционная цена"
          variant="outlined"
          type="number"
          value={promoPrice}
          onChange={(e) => {
            dispatch(
              setProductChange({ value: e.target.value, key: "promoPrice" })
            );
          }}
        />
        <TextField
          label="Описание"
          variant="outlined"
          value={description}
          onChange={(e) =>
            dispatch(
              setProductChange({ value: e.target.value, key: "description" })
            )
          }
        />
        {!!categoiesData && (
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={categoiesData}
            getOptionLabel={(option: Filling) => option.name}
            onChange={(_: any, newValue: any | null) => {
              if (!newValue) {
                dispatch(setProductCategory(""));
              } else {
                dispatch(setProductCategory(newValue._id));
              }
            }}
            renderInput={(params) => (
              <TextField {...params} label="Выберите категорию" />
            )}
          />
        )}

        {!!fillingsData && (
          <Autocomplete
            multiple
            id="tags-outlined"
            options={fillingsData}
            getOptionLabel={(option: Filling) => option.name}
            onChange={(event: any, newValue: any | null) => {
              const arr = newValue.map((el: Filling) => el._id);
              dispatch(setProductFillings(arr));
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Выберите доступные начинки"
                placeholder="Наименование"
              />
            )}
          />
        )}

        <FormControlLabel
          control={
            <Checkbox
              value={isStock}
              onChange={(e) =>
                dispatch(setProductChange({ value: !isStock, key: "isStock" }))
              }
            />
          }
          label="Есть в наличии?"
        />

        {isStock && (
          <TextField
            label="Кол-во в наличии"
            variant="outlined"
            type="number"
            value={count}
            onChange={(e) => {
              dispatch(
                setProductChange({ value: e.target.value, key: "count" })
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
        data={images}
      />
    </div>
  );
};

export default CreateProduct;
