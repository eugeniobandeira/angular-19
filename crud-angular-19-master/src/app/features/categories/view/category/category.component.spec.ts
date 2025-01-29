import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoryComponent } from './category.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('CategoryComponent', () => {

  let component: CategoryComponent;
  let fixture: ComponentFixture<CategoryComponent>;

  beforeEach((() => {
    TestBed.configureTestingModule({
      imports: [CategoryComponent ],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
