import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CategoryService } from '../../../../categories/services/category.service';
import { createTaskForm } from '../../../view/task/constants/create-task-form';
import { TaskService } from '../../../services/task.service';
import { ITask } from '../../../model/task.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

const MODULES = [
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule,
  FormsModule,
  ReactiveFormsModule,
];

@Component({
  selector: 'app-include-task-form',
  templateUrl: './include-task-form.component.html',
  styleUrls: ['./include-task-form.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [...MODULES],
})
export class IncludeTaskFormComponent {
  private readonly categoryService = inject(CategoryService);
  private readonly taskService = inject(TaskService);
  public destroy$ = inject(DestroyRef);

  public categories = this.categoryService.categories;

  public selectionChangeHandler(event: MatSelectChange): void {
    const categoryId = event.value;

    this.categoryService.selectedCategoryId.set(categoryId);
  }

  public newTaskForm = createTaskForm();

  public onAdd(): void {
    if (this.newTaskForm.invalid) return;

    const { title, categoryId } = this.newTaskForm.value;

    const newTask: Partial<ITask> = {
      title,
      categoryId,
      isCompleted: false,
    };

    this.taskService
      .create(newTask)
      .pipe(takeUntilDestroyed(this.destroy$))
      .subscribe({
        next: task => this.taskService.updateTaskInList(task),
        error: error => {
          console.error('Error creating task:', error);
        },
        complete: () => {
          alert('Task created successfully');
        },
      });
  }
}
