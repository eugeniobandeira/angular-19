import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CategoryService } from '../../services/category.service';

@Component({
    selector: 'app-main-list',
    imports: [],
    templateUrl: './main-list.component.html',
    styleUrl: './main-list.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
})
export class MainListComponent {

  private readonly categoryService = inject(CategoryService);

  public categories = this.categoryService.categories;
}
