import {
  ChangeDetectionStrategy,
  Component,
  computed,
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
import { delay } from 'rxjs/internal/operators/delay';
import { finalize } from 'rxjs';
import { CommonModule } from '@angular/common';
import { SnackbarService } from '../../../../../shared/services/snackbar.service';

const MODULES = [
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule,
  FormsModule,
  ReactiveFormsModule,
];

const COMMON = [CommonModule];

@Component({
  selector: 'app-include-task-form',
  templateUrl: './include-task-form.component.html',
  styleUrls: ['./include-task-form.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [...MODULES, ...COMMON],
})
export class IncludeTaskFormComponent {
  private readonly categoryService = inject(CategoryService);

  public readonly taskService = inject(TaskService);

  public readonly snackbarService = inject(SnackbarService);

  public readonly destroy$ = inject(DestroyRef);

  public readonly categories = this.categoryService.categories;

  public isIncludeTaskFormDisabled = computed(() => {
    if (this.taskService.isLoading()) {
      this.newTaskForm.disable();

      return this.taskService.isLoading();
    }

    this.newTaskForm.enable();
    return this.taskService.isLoading();
  });

  public selectionChangeHandler(event: MatSelectChange): void {
    const categoryId = event.value;

    this.categoryService.selectedCategoryId.set(categoryId);
  }

  public newTaskForm = createTaskForm();

  public onAdd(): void {
    if (this.newTaskForm.invalid) return;

    this.taskService.isLoading.set(true);

    const { title, categoryId } = this.newTaskForm.value;

    const newTask: Partial<ITask> = {
      title,
      categoryId,
      isCompleted: false,
    };

    this.taskService
      .create(newTask)
      .pipe(delay(4000), 
        finalize(() => this.taskService.isLoading.set(false)),
        takeUntilDestroyed(this.destroy$))
      .subscribe({
        next: task => this.taskService.updateTaskInList(task),
        error: error => {
          this.snackbarConfigHandler(error.message);
        },
        complete: () => {
          this.snackbarConfigHandler('Task added successfully');
        },
      });
  }

  public snackbarConfigHandler(message: string): void {
    this.snackbarService.showSnackBar(message, 4000, 'end', 'bottom');
  }
}
