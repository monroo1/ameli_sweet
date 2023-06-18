import { useAppDispatch } from "../../hooks/redux";
import {
  useDownloadMutation,
  useRemoveImageMutation,
} from "../../services/FileService";
import { API_URL } from "../../store/indexService";
import { SvgIcon } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

import { DndProvider, XYCoord, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useCallback, useRef } from "react";
import update from "immutability-helper";
import { IAddImages } from "../../utils/interface/file";

import "./addImages.scss";

const ItemTypes = {
  CARD: "card",
};

export const CardImage = ({
  id,
  el,
  index,
  moveCard,
  data,
  deleteImage,
}: any) => {
  const ref = useRef<HTMLInputElement>(null);

  const [{ handlerId }, drop] = useDrop({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: any, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveCard(dragIndex, hoverIndex, data);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <div
      className="image-container--item"
      ref={ref}
      data-handler-id={handlerId}
      style={{ opacity }}
    >
      <img src={API_URL + el.href} alt={el.name} />
      <button
        onClick={() => deleteImage(el.href)}
        className="image-container--item--btn"
      >
        <SvgIcon fontSize="large" color="warning">
          <HighlightOffIcon />
        </SvgIcon>
      </button>
    </div>
  );
};

export const AddImages = ({
  addImage,
  removeImage,
  moveImage,
  data,
}: IAddImages) => {
  const dispatch = useAppDispatch();
  const formData = new FormData();
  const [download, { isLoading: downloadLoading }] = useDownloadMutation();
  const [remove] = useRemoveImageMutation();

  const moveCard = useCallback(
    (dragIndex: number, hoverIndex: number, data: any) => {
      let arr = [...data];
      dispatch(
        moveImage(
          update(arr, {
            $splice: [
              [dragIndex, 1],
              [hoverIndex, 0, data[dragIndex]],
            ],
          })
        )
      );
    },
    []
  );

  const renderCard = useCallback(
    (card: any, index: number, data: any, deleteImage: Function) => {
      return (
        <CardImage
          key={index}
          index={index}
          id={index}
          el={card}
          moveCard={moveCard}
          data={data}
          deleteImage={deleteImage}
        />
      );
    },
    []
  );

  const downloadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const target = e.currentTarget as HTMLInputElement;
    const file = target.files![0];
    formData.append("image", file);
    const res = await download(formData).unwrap();
    dispatch(addImage(res));
  };

  const deleteImage = async (href: string) => {
    await remove(href.substr(9)).unwrap();
    dispatch(removeImage(href));
  };

  return (
    <div className="add-images">
      <input
        type="file"
        hidden
        id="down-file"
        disabled={downloadLoading}
        onChange={(e) => downloadImage(e)}
      />
      {downloadLoading ? (
        <div>загрузка...</div>
      ) : (
        <label htmlFor="down-file" className="add-image">
          Добавить фото
        </label>
      )}

      <div className="image-container">
        <DndProvider backend={HTML5Backend}>
          {data.map((card, i) => renderCard(card, i, data, deleteImage))}
        </DndProvider>
      </div>
    </div>
  );
};
