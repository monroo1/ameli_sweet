import { Button, Divider, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
  usePatchCategoryMutation,
} from "../../../services/CategoryService";
import {
  setCategoryName,
  setCategoryNewName,
} from "../../../store/reducers/CategorySlice";

import "./category.scss";

export const CategoryList = () => {
  const dispatch = useAppDispatch();
  const { name, newName } = useAppSelector((state) => state.categoryReducer);
  const { data } = useGetCategoriesQuery();

  const [patchCategory] = usePatchCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  return (
    <div className="category-list">
      {data &&
        data.map((el: { name: string }, i: number) => (
          <div key={i} className="category-list--el">
            <TextField
              value={name === el.name ? newName : el.name}
              disabled={name !== el.name}
              onChange={(e) => dispatch(setCategoryNewName(e.target.value))}
            />
            {name === el.name ? (
              <div className="category-list--el-btns">
                <Button
                  variant="contained"
                  onClick={() => patchCategory({ name, newName })}
                >
                  Сохранить
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => dispatch(setCategoryName(""))}
                >
                  Отменить
                </Button>
              </div>
            ) : (
              <div className="category-list--el-btns">
                <Button
                  variant="contained"
                  onClick={() => dispatch(setCategoryName(el.name))}
                >
                  Изменить
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => deleteCategory(el.name)}
                >
                  Удалить
                </Button>
              </div>
            )}
            <Divider />
          </div>
        ))}
    </div>
  );
};

export const CategoryCreate = () => {
  const dispatch = useAppDispatch();
  const { name } = useAppSelector((state) => state.categoryReducer);
  const [createCategory] = useCreateCategoryMutation();
  return (
    <div className="category-create">
      <TextField
        value={name}
        label="Название категории"
        onChange={(e) => dispatch(setCategoryName(e.target.value))}
      />
      <Button variant="contained" onClick={() => createCategory(name)}>
        Создать
      </Button>
    </div>
  );
};
