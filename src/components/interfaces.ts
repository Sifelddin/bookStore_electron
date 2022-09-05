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

export interface Book {
  '@id': string;
  '@type': string;
  author: string;
  editor: string;
  id: number;
  photo: string;
  price: string;
  releaseDate: string;
  title: string;
  slug: string;
  description: string;
  stock: number;
  stockAlert: number;
  published: boolean;
  category: Category;
  supplier: Supplier;
  updateAt: string;
  createdAt: string;
  bookOrders: string[];
}

export type User = {
  '@id': string;
  id: number;
  email: string;
  roles: string[];
  firstname: string;
  lastname: string;
  address: string;
  zipCode: string;
  city: string;
  phone: string;
  Coef: string;
  private: boolean;
  orders: Order[];
};

export type Order = {
  '@id': string;
  '@type': string;
  billAddress: string;
  billCity: string;
  billZipCode: string;
  bookOrders: BookOrders[];
  coef: string;
  id: number;
  orderDate: string;
  paymentDate: string;
  shipAddress: string;
  shipCity: string;
  shipZipCode: string;
  payMethod: string;
  discount: string;
};

export type BookOrders = {
  '@id': string;
  '@type': string;
  book: Book;
  quantity: number;
  unitPrice: string;
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
  'hydra:member': (Category | Supplier | Book | User | Order)[];
  'hydra:totalItems': number;
  'hydra:view': View;
};
export interface ContentList {
  loading: boolean;
  data: Data | undefined;
}

export interface Evalidation {
  code: string;
  message: string;
  propertyPath: keyof FormInputs;
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
  stock: string;
  stockAlert: string;
  published: boolean;
  supplier: string;
  releaseDate: string;
  paymentDate?: string;
  discount: string;
  private: string | undefined | boolean | null;
  roles: string;
  Coef: string;
  username: string;
  password: string;
  credentials: string;
}

export interface FormComponentProps {
  method?: string;
  action: string;
  book?: Book;
  supplier?: Supplier;
  category?: Category;
}

export type BookFetch = {
  loading: boolean;
  data: Book | undefined;
};
export type SupplierFetch = {
  loading: boolean;
  data: Supplier | undefined;
};
export type CategoryFetch = {
  loading: boolean;
  data: Category | undefined;
};
export type UserFetch = {
  loading: boolean;
  data: User | undefined;
};

export type OrderFetch = {
  loading: boolean;
  data: Order | undefined;
};
