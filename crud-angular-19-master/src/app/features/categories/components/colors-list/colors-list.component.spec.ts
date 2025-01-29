import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorsListComponent } from './colors-list.component';
import { signal } from '@angular/core';
import { CategoryService } from '../../services/category.service';

describe('ColorsListComponent', () => {
  let component: ColorsListComponent;
  let fixture: ComponentFixture<ColorsListComponent>;

  const categoryServiceMock = {
    categories: signal(['Category 1', 'Category 2', 'Category 3']),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColorsListComponent],
      providers: [{ provide: CategoryService, useValue: categoryServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(ColorsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
