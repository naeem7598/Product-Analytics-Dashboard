import {Component, OnInit} from '@angular/core';
import {ProductsService} from "../../@core/services/products/products.service";
import {IProductListResponse} from "../../@core/models/products/IProductListResponse";
import {IProductInfo} from "../../@core/models/products/IProduct-info";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products : IProductInfo[] = [];
  columns = ['brand','category','price','rating','description']
  constructor(private productService : ProductsService, private router : Router) {
  }
  ngOnInit() {
    this.getProductList();
  }
  getProductList() {
    this.productService.getProductList().subscribe(res => {
      // حتماً reference جدید بسازید تا OnPush تغییر را ببیند
      this.products = [...res.products];
    });
  }
  getSelectedRow(productId:number){
    this.router.navigate(['products',productId]);
  }
}
