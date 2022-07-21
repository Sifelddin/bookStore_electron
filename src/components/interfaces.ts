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
  catParent: null;
  name: string;
  photo: string;
  id: number;
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
  'hydra:member': (Category | Supplier)[];
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

export interface FormInputs {
  contactName: string;
  name: string;
  catParent: string;
  photo: string;
}
