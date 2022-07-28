export type Supplier = {
  '@id': string;
  '@type': string;
  books: string[];
  contactName: string;
  id: number;
};

export type Category = {
  '@id': string;
  '@type': string;
  catParent: null | Category;
  name: string;
  photo: string;
  id: number;
  subCategories: Category[];
  books: string[];
};

export type Book = {
  '@id': string;
  '@type': string;
  author: string;
  id: number;
  photo: string;
  price: string;
  releaseDate: string;
  title: string;
  slug: string;
  stock: number;
  published: boolean;
};
export interface View {
  '@id': string;
  '@type': string;
  'hydra:first': string;
  'hydra:last': string;
  'hydra:next': string;
  'hydra:previous': string;
}

export type Data = {
  '@context': string;
  '@id': string;
  '@type': string;
  'hydra:member': (Category | Supplier | Book)[];
  'hydra:totalItems': number;
  'hydra:view': View;
};
export interface Content {
  loading: boolean;
  data: Data | undefined;
}

export interface Evalidation {
  code: string;
  message: string;
  propertyPath: string;
}

export type File = {
  lastModified: number;
  lastModifiedDate: Date;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
};
export interface FormInputs {
  contactName: string;
  name: string;
  catParent: string;
  imageFile: string;
  title: string;
  author: string;
  editor: string;
  description: string;
  price: string;
  category: string;
  stock: number;
  stockAlert: number;
  published: boolean;
  supplier: string;
}

export interface FormComponentProps {
  method: string;
  action: string;
  book?: Book;
  supplier?: Supplier;
  category?: Category;
}
