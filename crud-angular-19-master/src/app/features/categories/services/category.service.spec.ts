import { TestBed } from '@angular/core/testing';
import { CategoryService } from './category.service';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ICategory } from '../model/category.model';

describe('Service: Category', () => {
  let service: CategoryService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CategoryService, provideHttpClient(), provideHttpClientTesting()]
    });

    service = TestBed.inject(CategoryService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch categories from API', () => {
    const mockCategories: ICategory[] = [
      { id: '1', name: 'Category 1', color: 'green' },
      { id: '2', name: 'Category 2', color: 'white' }
    ];

    service.categories(); 

    const req = httpTestingController.expectOne(`${service['_apiUrl']}/categories`);
    expect(req.request.method).toBe('GET');

    req.flush(mockCategories);

    expect(service.categories()).toEqual(mockCategories);

    httpTestingController.verify();
  });
});
