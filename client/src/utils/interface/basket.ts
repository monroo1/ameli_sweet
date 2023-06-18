import { IProduct } from "./product";

export interface IBasketItem {
  _id?: string;
  product: IProduct | string;
  filling: string;
  count: number;
}

export interface PatchBasketItem {
  _id: string;
  count: number;
}
