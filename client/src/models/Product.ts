export interface IProduct {
  _id: string;
  name: string;
  price: number;
  promoPrice: number;
  description: string;
  isStock: boolean;
  count: number;
  images: IFile[];
}

export interface IFile {
  href: string;
  name: string;
}
