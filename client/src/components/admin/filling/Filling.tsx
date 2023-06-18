import { Button, TextField } from "@mui/material";
import { useAppSelector, useAppDispatch } from "../../../hooks/redux";
import {
  useCreateFillingMutation,
  useDeleteFillingMutation,
  useGetFillingsQuery,
  usePatchFillingMutation,
} from "../../../services/FillingService";
import {
  setFilling,
  setFillingDescription,
  setFillingImages,
  setFillingImagesDnd,
  setFillingImagesRemove,
  setFillingName,
  setFillingPrice,
} from "../../../store/reducers/FillingSlice";
import { AddImages } from "../../addImages/AddImages";
import { API_URL } from "../../../store/indexService";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";

import "./filling.scss";
import { useNavigate } from "react-router-dom";
import { CSSProperties } from "react";
import { IFilling } from "../../../utils/interface/filling";
import { IFile } from "../../../utils/interface/file";

export const FillingCreate = () => {
  const dispatch = useAppDispatch();
  const filling = useAppSelector((state) => state.fillingReducer);

  const [patchedFilling] = usePatchFillingMutation();
  const [createFiling] = useCreateFillingMutation();

  const handleCreate = async () => {
    if (!!filling._id) {
      await patchedFilling({
        id: filling._id,
        body: {
          name: filling.name,
          description: filling.description,
          images: filling.images,
          price: filling.price,
        },
      });
    } else {
      await createFiling({
        name: filling.name,
        description: filling.description,
        images: filling.images,
        price: filling.price,
      });
    }
  };

  return (
    <div className="create-filling">
      <div>
        <TextField
          label="Название начинки"
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
      </div>
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
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { data } = useGetFillingsQuery();

  const [deleteFilling] = useDeleteFillingMutation();

  const handlePatchFilling = (el: IFilling) => {
    dispatch(
      setFilling({
        _id: el._id,
        name: el.name,
        description: el.description,
        price: el.price,
        images: el.images,
      })
    );
    navigate("/admin/filling/create");
  };

  const handleDeleteFilling = (id: string) => {
    if (window.confirm("Подтверждение удаления")) {
      deleteFilling(id);
    }
  };

  return (
    <div className="filling">
      {!!data &&
        data.map((el: IFilling, i: number) => (
          <div key={i} className="filling-item">
            <div>
              <div>
                <h2 className="filling-item--title">
                  Название: <span className="title">{el.name}</span>
                </h2>
                <p className="filling-item--description">
                  Описание: {el.description}
                </p>
                <span className="filling-item--price">
                  <span className="price">Цена: {el.price + " p."}</span>
                </span>
              </div>
              <div>
                <Button
                  variant="contained"
                  onClick={() => handlePatchFilling(el)}
                >
                  Изменить
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => handleDeleteFilling(el._id)}
                >
                  Удалить
                </Button>
              </div>
            </div>
            <div className="filling-item--images">
              <Swiper
                style={
                  {
                    "--swiper-navigation-color": "#fff",
                    "--swiper-pagination-color": "#fff",
                    "--swiper-navigation-size": 33 + "px",
                  } as CSSProperties
                }
                spaceBetween={10}
                navigation={true}
                modules={[FreeMode, Navigation]}
                className="mySwiper3"
              >
                {el.images.map((el: IFile, i: number) => (
                  <SwiperSlide key={i}>
                    <div className="filling-item--images-el">
                      <img src={API_URL + el.href} alt={el.name} />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        ))}
    </div>
  );
};
