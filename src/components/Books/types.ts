import { Book } from '../interfaces';

export type Content = {
  loading: boolean;
  data: Book | undefined;
};
