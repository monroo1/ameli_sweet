import {
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Fab,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useEffect } from "react";
import { useDownloadMutation } from "../services/FileService";
import { useCreateMutation } from "../services/ProductsService";
import { changeValue, addImages } from "../store/reducers/ProductSlice";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { API_URL } from "../store/indexService";
import React from "react";

const CreateProduct = () => {
  const dispatch = useAppDispatch();
  const product = useAppSelector((state) => state.productReducer);
  const formData = new FormData();

  const [download, { isLoading: downloadLoading }] = useDownloadMutation();
  const [create, { isLoading: createLoading }] = useCreateMutation();

  const downloadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const target = e.currentTarget as HTMLInputElement;
    const file = target.files![0];
    formData.append("image", file);
    const res = await download(formData).unwrap();
    dispatch(addImages(res));
  };

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
    console.log(res);
  };

  return (
    <div className="max-w-screen-xl mx-auto h-full flex gap-5">
      <div className="w-1/4 flex flex-col justify-between gap-2 mt-3">
        <TextField
          label="Название"
          variant="outlined"
          value={product.name}
          onChange={(e) =>
            dispatch(changeValue({ value: e.target.value, key: "name" }))
          }
        />
        <TextField
          label="Цена"
          variant="outlined"
          type="number"
          value={product.price}
          onChange={(e) => {
            dispatch(changeValue({ value: +e.target.value, key: "price" }));
          }}
        />
        <TextField
          label="Акционная цена"
          variant="outlined"
          type="number"
          value={product.promoPrice}
          onChange={(e) => {
            dispatch(
              changeValue({ value: +e.target.value, key: "promoPrice" })
            );
          }}
        />
        <TextField
          label="Описание"
          variant="outlined"
          value={product.description}
          onChange={(e) =>
            dispatch(changeValue({ value: e.target.value, key: "description" }))
          }
        />
        <FormControlLabel
          control={
            <Checkbox
              value={product.isStock}
              onChange={(e) =>
                dispatch(
                  changeValue({ value: !product.isStock, key: "isStock" })
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
              dispatch(changeValue({ value: +e.target.value, key: "count" }));
            }}
          />
        )}

        <Button variant="contained" onClick={fetchCreateProduct}>
          Сохранить
        </Button>
      </div>
      <div className="mt-3 flex gap-3 flex-wrap">
        <div>
          {product.images.map((el) => (
            <div key={el.href}>
              <img src={API_URL + el.href} />
            </div>
          ))}
        </div>
        <div>
          <input
            type="file"
            hidden
            id="down-file"
            onChange={(e) => downloadImage(e)}
          />
          <label htmlFor="down-file">
            <Fab color="primary" aria-label="add" component="span">
              <AddIcon />
            </Fab>
          </label>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
