import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CategoryService } from '../../../../categories/services/category.service';

const MODULES = [
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule,
  FormsModule,
  ReactiveFormsModule
];

@Component({
  selector: 'app-include-task-form',
  templateUrl: './include-task-form.component.html',
  styleUrls: ['./include-task-form.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [...MODULES]
})
export class IncludeTaskFormComponent {
  private readonly categoryService = inject(CategoryService);

  public categories = this.categoryService.categories; 
  
  public selectionChangeHandler(event: MatSelectChange): void {
    const categoryId = event.value;

    this.categoryService.selectedCategoryId.set(categoryId);
  }
}


