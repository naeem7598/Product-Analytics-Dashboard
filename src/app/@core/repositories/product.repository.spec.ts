import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {ProductRepository} from "./product-repository";
import {IProductInfo} from "../models/products/IProduct-info";

describe('ProductRepository', () => {
  let repo: ProductRepository;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductRepository]
    });

    repo = TestBed.inject(ProductRepository);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(repo).toBeTruthy();
  });

  it('getAll should return products', () => {
    const mockProducts: IProductInfo[] = [
      { id: 1, title: 'Product 1', price: 100, description: '', brand: '', category: '', thumbnail: '', images: [] },
      { id: 2, title: 'Product 2', price: 200, description: '', brand: '', category: '', thumbnail: '', images: [] }
    ];

    repo.getAll().subscribe(res => {
      expect(res.products.length).toBe(2);
      expect(res.products).toEqual(mockProducts);
    });

    const req = httpMock.expectOne('https://dummyjson.com/products');
    expect(req.request.method).toBe('GET');
    req.flush({ products: mockProducts, total: 2, skip: 0, limit: 10 });
  });

  it('getById should return a product', () => {
    const mockProduct: IProductInfo = { id: 1, title: 'Product 1', price: 100, description: '', brand: '', category: '', thumbnail: '', images: [] };

    repo.getById(1).subscribe(res => {
      expect(res).toEqual(mockProduct);
    });

    const req = httpMock.expectOne('https://dummyjson.com/products/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockProduct);
  });
});
