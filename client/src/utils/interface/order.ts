import { IFilling } from "./filling";
import { IProduct } from "./product";

export interface IOrderItem {
  _id: string;
  product: IProduct;
  filling: IFilling;
  count: number;
}

export interface IOrder {
  _id: string;
  items: IOrderItem[];
  user: string;
  cost: number;
  status: number;
  payments: boolean;
  delivery: boolean;
  communication: number;
  phoneNumber: string;
  date: string;
  paymentId?: string | undefined;
}

export interface OrderPatchStatusRequest {
  id: string;
  newStatus: number;
}

export interface OrderStages {
  name: string;
  color: string;
}
