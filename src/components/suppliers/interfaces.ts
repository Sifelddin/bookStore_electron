export interface ISupplier {
  '@id': string;
  '@type': string;
  books: string[];
  contactName: string;
  id: number;
}

export interface IFormInputs {
  contactName: string;
}
