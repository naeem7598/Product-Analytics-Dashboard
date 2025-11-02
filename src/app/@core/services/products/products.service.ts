import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {IProductListResponse} from "../../models/products/IProductListResponse";
import {BaseService} from "../base-service";
import {IProductInfo} from "../../models/products/IProduct-info";
import {IProductChartInfo} from "../../models/products/IProduct-chart-info";

@Injectable({
  providedIn: 'root'
})
export class ProductsService extends BaseService{

  constructor(http : HttpClient) {
    super(http);
  }

  getProductList(): Observable<IProductListResponse> {
    return this.get<IProductListResponse>('products');
  }
  getProduct(productId:number):Observable<IProductChartInfo> {
    return this.get<IProductInfo>(`products/${productId}`).pipe(
      map(product => ({
        ...product,
        salesData: Array.from({ length: 12 }, () => Math.floor(Math.random() * 100) + 10)
      }))
    );
  }
}
