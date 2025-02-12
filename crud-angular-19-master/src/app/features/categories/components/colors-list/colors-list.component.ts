import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { CategoryService } from '../../services/category.service';
import { category_background_colors } from '../../constants/category-colors';

const MODULES = [MatDividerModule];

@Component({
    selector: 'app-colors-list',
    standalone: true,
    imports: [...MODULES],
    templateUrl: './colors-list.component.html',
    styleUrl: './colors-list.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColorsListComponent {
  private readonly categoryService = inject(CategoryService);

  public categories = this.categoryService.categories;
  public categoryBackgroundColors = category_background_colors;
}
