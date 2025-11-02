import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductsService} from "../../@core/services/products/products.service";
import {Observable, switchMap} from "rxjs";
import {IProductChartInfo} from "../../@core/models/products/IProduct-chart-info";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailsComponent implements OnInit {
  product$!: Observable<IProductChartInfo>;
  chartData: any;
  months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  salesData: number[] = [];

  constructor(private route: ActivatedRoute, private productService: ProductsService) {
  }

  ngOnInit(): void {
    this.product$ = this.route.paramMap.pipe(
      switchMap(params => {
          const id = params.get('id')!
          return this.productService.getProduct(+id)
      }));
  }

}
