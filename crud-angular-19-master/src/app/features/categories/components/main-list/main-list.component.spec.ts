import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainListComponent } from './main-list.component';
import { CategoryService } from '../../services/category.service';
import { signal } from '@angular/core';

describe('MainListComponent', () => {
  let component: MainListComponent;
  let fixture: ComponentFixture<MainListComponent>;

  const categoryServiceMock = {
    categories: signal(['Category 1', 'Category 2', 'Category 3'])
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainListComponent],
      providers: [
        { provide: CategoryService, useValue: categoryServiceMock } 
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have categories from the service', () => {
    expect(component.categories()).toEqual(['Category 1', 'Category 2', 'Category 3']);
  });
});
