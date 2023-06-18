export interface CategoryPatchRequest {
  newName: string;
  name: string;
}

export interface ICategory {
  _id: string;
  name: string;
}

export interface CategoryCreateRequest {
  name: string;
}
