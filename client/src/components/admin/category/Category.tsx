import { Button, TextField } from "@mui/material";
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

export const CategoryList = () => {
  const dispatch = useAppDispatch();
  const { name, newName } = useAppSelector((state) => state.categoryReducer);
  const { data } = useGetCategoriesQuery();

  const [patchCategory] = usePatchCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  return (
    <div>
      {data &&
        data.map((el: { name: string }, i: number) => (
          <div key={i}>
            <TextField
              value={name === el.name ? newName : el.name}
              disabled={name !== el.name}
              onChange={(e) => dispatch(setCategoryNewName(e.target.value))}
            />
            {name === el.name ? (
              <Button
                variant="contained"
                onClick={() => patchCategory({ name, newName })}
              >
                Сохранить
              </Button>
            ) : (
              <>
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
              </>
            )}
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
    <div>
      <TextField
        value={name}
        onChange={(e) => dispatch(setCategoryName(e.target.value))}
      />
      <Button variant="outlined" onClick={() => createCategory(name)}>
        Создать
      </Button>
    </div>
  );
};
