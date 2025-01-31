/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IncludeTaskFormComponent } from './include-task-form.component';
import { CategoryService } from '../../../../categories/services/category.service';
import { Observable, of } from 'rxjs';
import { task } from '../../../../../__mock__/task.mock.';
import { SnackbarService } from '../../../../../shared/services/snackbar.service';
import { ITask } from '../../../model/task.model';
import { TaskService } from '../../../services/task.service';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';

describe('IncludeTaskFormComponent', () => {
  let component: IncludeTaskFormComponent;
  let fixture: ComponentFixture<IncludeTaskFormComponent>;
  let categoryService: CategoryService;
  let taskService: TaskService;
  let snackbarService: SnackbarService;
  let createTaskSpy: jest.SpyInstance<Observable<ITask>>;

  const MOCKED_TASK = task;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ IncludeTaskFormComponent ],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideAnimations()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncludeTaskFormComponent);
    categoryService = TestBed.inject(CategoryService);
    taskService = TestBed.inject(TaskService);
    snackbarService = TestBed.inject(SnackbarService);
    
    createTaskSpy = jest
      .spyOn(taskService, 'create')
      .mockReturnValue(of(MOCKED_TASK));

      component = fixture.componentInstance;
      fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('visibility', () => {
    it('should render initial newTaskForm state value', () => {
      const newTaskForm = component.newTaskForm;

      expect(newTaskForm.controls.title.value).toEqual('');
      expect(newTaskForm.controls.categoryId.value).toEqual('1');
    });

    it('should render initial newTaskForm label values', () => {
      const titleLabel = fixture.debugElement.query(By.css('[data-testid="titleLabel"]'));
      const categoryLabel = fixture.debugElement.query(By.css('[data-testid="categoryLabel"]'));

      expect(titleLabel.nativeElement.textContent).toContain('Tasks');
      expect(categoryLabel.nativeElement.textContent).toContain('Category');
    });

    it('should call selectionChangeHandler when mat-select dispatch selection event', () => {
      const categoryId = '3';

      const event = { value: categoryId };

      const selectionChangeHandlerSpy = jest
       .spyOn(component,'selectionChangeHandler')
       .mockImplementation(() => {});

       fixture.debugElement
        .query(By.css('mat-select'))
        .triggerEventHandler('selectionChange', event);

        expect(selectionChangeHandlerSpy).toHaveBeenCalledWith(event);
    });

    it('should call showSnackbar when snackBarConfigHandler is called with a message', () => {
      const message = 'Task added!';

      const showSnackBarSpy = jest
       .spyOn(snackbarService,'showSnackBar')
       .mockImplementation(() => {});

       component.snackbarConfigHandler(message);

        expect(showSnackBarSpy).toHaveBeenCalledWith(message, 4000, 'end', 'bottom');
    });
    
  })
});
