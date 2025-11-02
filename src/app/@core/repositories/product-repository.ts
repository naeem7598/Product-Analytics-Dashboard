import { Injectable } from '@angular/core';
import {BaseRepository} from "./base-repository";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IProductInfo} from "../models/products/IProduct-info";
import {IListResponse} from "../models/commone/IListResponse";

@Injectable({
  providedIn: 'root'
})
export class ProductRepository extends BaseRepository<IProductInfo> {
  constructor(http: HttpClient) {
    super(http, 'products');
  }
  getProductListRepo(): Observable<IListResponse<IProductInfo>> {
    return this.getAll();
  }

  getProductByIdRepo(id: number): Observable<any> {
    return this.getById(id);
  }
}
