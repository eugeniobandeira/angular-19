import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { IncludeTaskFormComponent } from './include-task-form/include-task-form.component';
import { CategoryService } from '../../../categories/services/category.service';
import { categoryId_background_colors } from '../../../categories/constants/category-colors';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';

const COMPONENTS = [IncludeTaskFormComponent];
const COMMON = [CommonModule];

@Component({
  selector: 'app-inclusion-form',
  templateUrl: './inclusion-form.component.html',
  styleUrls: ['./inclusion-form.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [...COMPONENTS, ...COMMON]
})
export class InclusionFormComponent { 
  private readonly categoryService = inject(CategoryService);
  public readonly taskService = inject(TaskService);

  public readonly selectedCategoryId = this.categoryService.selectedCategoryId;

  public colorVariants = categoryId_background_colors;;
}
