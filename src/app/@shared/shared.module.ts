import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductTableComponent } from './components/product-table/product-table.component';
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import { ProductChartComponent } from './components/product-chart/product-chart.component';
import { LoadingComponent } from './components/loading/loading.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {NgxEchartsModule} from "ngx-echarts";
import {ReactiveFormsModule} from "@angular/forms";
import { CardComponent } from './components/smcard/card.component';
import {MatCardModule} from "@angular/material/card";



@NgModule({
  declarations: [
    ProductTableComponent,
    ProductChartComponent,
    LoadingComponent,
    CardComponent
  ],
    imports: [
        CommonModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatInputModule,
        MatProgressSpinnerModule,
        ReactiveFormsModule,
        NgxEchartsModule.forRoot({
            echarts: () => import('echarts')
        }),
        MatCardModule
    ],
  exports: [ProductTableComponent, LoadingComponent, ProductChartComponent, CardComponent]
})
export class SharedModule { }
