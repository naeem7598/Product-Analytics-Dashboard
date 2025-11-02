export interface IListResponse<T> {
  products: T[];
  total: number;
  skip: number;
  limit: number;
}
