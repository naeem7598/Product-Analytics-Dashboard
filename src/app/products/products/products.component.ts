import {Component, OnInit} from '@angular/core';
import {ProductsService} from "../../@core/services/products/products.service";
import {IProductInfo} from "../../@core/models/products/IProduct-info";
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
      //  OnPush
      this.products = [...res.products];
    });
  }
  getSelectedRow(productId:number){
    console.log(productId)
    this.router.navigate(['/products',productId]);
  }
}
