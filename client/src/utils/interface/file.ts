export interface IFile {
  href: string;
  name: string;
}

export interface IAddImages {
  addImage: Function;
  removeImage: Function;
  moveImage: Function;
  data: IFile[];
}
