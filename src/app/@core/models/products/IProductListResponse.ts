import {IProductInfo} from "./IProduct-info";

export interface IProductListResponse {
  products: IProductInfo[];
  total: number;
  skip: number;
  limit: number;
}
