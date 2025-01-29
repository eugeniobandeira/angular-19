import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { IncludeTaskFormComponent } from './include-task-form/include-task-form.component';
import { CategoryService } from '../../../categories/services/category.service';
import { categoryId_background_colors } from '../../../categories/constants/category-colors';

const COMPONENTS = [IncludeTaskFormComponent];

@Component({
  selector: 'app-inclusion-form',
  templateUrl: './inclusion-form.component.html',
  styleUrls: ['./inclusion-form.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [...COMPONENTS]
})
export class InclusionFormComponent { 
  private readonly categoryService = inject(CategoryService);

  public readonly selectedCategoryId = this.categoryService.selectedCategoryId;

  public colorVariants = categoryId_background_colors;;
}
