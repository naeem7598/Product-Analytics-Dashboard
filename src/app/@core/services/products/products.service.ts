import {Injectable} from '@angular/core';
import {map, Observable} from "rxjs";
import {IProductInfo} from "../../models/products/IProduct-info";
import {IProductChartInfo} from "../../models/products/IProduct-chart-info";
import {ProductRepository} from "../../repositories/product-repository";
import {IListResponse} from "../../models/commone/IListResponse";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private productRepo : ProductRepository) {
  }

  getProductList(): Observable<IListResponse<IProductInfo>> {
    return this.productRepo.getProductListRepo();
  }
  getProduct(productId:number):Observable<IProductChartInfo> {
    return this.productRepo.getProductByIdRepo(productId).pipe(
      map(product => ({
        ...product,
        salesData: Array.from({ length: 12 }, () => Math.floor(Math.random() * 100) + 10)
      }))
    );
  }
}
