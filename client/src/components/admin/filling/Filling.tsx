import { Button, TextField } from "@mui/material";
import { useAppSelector, useAppDispatch } from "../../../hooks/redux";
import {
  useCreateFillingMutation,
  useGetFillingsQuery,
  usePatchFillingMutation,
} from "../../../services/FillingService";
import {
  Filling,
  setFillingDescription,
  setFillingImages,
  setFillingImagesDnd,
  setFillingImagesRemove,
  setFillingName,
  setFillingPrice,
} from "../../../store/reducers/FillingSlice";
import { AddImages } from "../../addImages/AddImages";
import { IFile } from "../../../models/Product";
import { API_URL } from "../../../store/indexService";

import "./filling.scss";

export const FillingCreate = () => {
  const dispatch = useAppDispatch();
  const filling = useAppSelector((state) => state.fillingReducer);

  const [patchedFilling] = usePatchFillingMutation();
  const [createFiling] = useCreateFillingMutation();

  const handleCreate = async () => {
    //is patchend
    if (!!filling._id) {
      const res = await createFiling({
        name: filling.name,
        description: filling.description,
        images: filling.images,
        price: filling.price,
      });
      console.log(res);
    } else {
      const res = await patchedFilling({
        id: filling._id,
        body: {
          name: filling.name,
          description: filling.description,
          images: filling.images,
          price: filling.price,
        },
      });
      console.log(res);
    }
  };

  return (
    <div>
      <TextField
        label="Название"
        variant="outlined"
        value={filling.name}
        onChange={(e) => dispatch(setFillingName(e.target.value))}
      />
      <TextField
        label="Описание"
        variant="outlined"
        value={filling.description}
        onChange={(e) => dispatch(setFillingDescription(e.target.value))}
      />
      <TextField
        label="Цена"
        variant="outlined"
        type="number"
        value={filling.price}
        onChange={(e) => dispatch(setFillingPrice(e.target.value))}
      />
      <Button variant="contained" onClick={handleCreate}>
        Сохранить
      </Button>
      <AddImages
        addImage={setFillingImages}
        removeImage={setFillingImagesRemove}
        moveImage={setFillingImagesDnd}
        data={filling.images}
      />
    </div>
  );
};

export const FillingList = () => {
  const { data } = useGetFillingsQuery();
  return (
    <div className="filling">
      {!!data &&
        data.map((el: Filling, i: number) => (
          <div key={i} className="filling-item">
            <h2 className="filling-item--title">{el.name}</h2>
            <p className="filling-item--description">{el.description}</p>
            <span className="filling-item--price">{el.price}</span>
            <div className="filling-item--images">
              {el.images.map((image: IFile, ind: number) => (
                <div key={ind} className="filling-item--images-el">
                  <img
                    src={API_URL + "/uploads/" + image.href}
                    alt={image.name}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
};
