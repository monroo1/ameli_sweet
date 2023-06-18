import { IFile } from "./file";

export interface IProduct {
  _id: string;
  name: string;
  price: number;
  promoPrice: number;
  description: string;
  isStock: boolean;
  quantityInStock: number;
  images: IFile[];
  category: string;
  fillings: [];
}

export interface ProductCreateRequest {
  name: string;
  price: number;
  promoPrice: number;
  description: string;
  isStock: boolean;
  quantityInStock: number;
  images: IFile[];
  category: string;
  fillings: string[];
}

export interface ProductPatchRequest {
  id: string;
  credentials: ProductCreateRequest;
}
