import { IFile } from "./file";

export interface IFilling {
  _id: string;
  name: string;
  description: string;
  images: IFile[];
  price: number;
}

export interface FillingCreateRequest {
  name: string;
  description: string;
  images: IFile[];
  price: number;
}

export interface FillingPatchRequest {
  id: string;
  body: FillingCreateRequest;
}
