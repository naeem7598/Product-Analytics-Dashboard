import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component, EventEmitter,
  Input,
  OnChanges,
  OnInit, Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {IProductInfo} from "../../../@core/models/products/IProduct-info";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {FormBuilder, FormGroup} from "@angular/forms";
import {debounceTime, switchMap} from "rxjs";

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductTableComponent implements OnChanges, AfterViewInit, OnInit {
  @Input() products: IProductInfo[] = [];
  @Input() columns: string[] = [];
  dataSource!: MatTableDataSource<IProductInfo>;
  displayedColumns: string[] = [];
  filterForm!: FormGroup;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @Output() selectedRow = new EventEmitter<any>();

  constructor(private fb: FormBuilder) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['products'] && this.products) {
      this.dataSource = new MatTableDataSource([...this.products]);
      this.displayedColumns = [...this.columns];

      // فیلتر فقط بر اساس category
      this.dataSource.filterPredicate = (data, filter) => {
        return data.category.toLowerCase().includes(filter);
      };

      if (this.paginator) this.dataSource.paginator = this.paginator;
      if (this.sort) this.dataSource.sort = this.sort;
    }
  }

  initFilTerrForm() {
    this.filterForm = this.fb.group({
      category: ['']
    })
  }

  ngOnInit(): void {
    this.initFilTerrForm();
    this.applyFilter();
  }

  ngAfterViewInit() {
    // بعد از اینکه ویو آماده شد، paginator و sort را ست می‌کنیم
    this.dataSource = new MatTableDataSource([...this.products]);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter() {
    this.filterForm.get('category')!.valueChanges
      .pipe(debounceTime(300))
      .subscribe(value => {
        this.dataSource.filter = value.trim().toLowerCase();
      });
  }

  edit(element: IProductInfo) {
    this.selectedRow.emit(element.id);
  }


}
