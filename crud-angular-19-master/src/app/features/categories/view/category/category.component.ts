import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ColorsListComponent } from '../../components/colors-list/colors-list.component';
import { MainListComponent } from "../../components/main-list/main-list.component";
import { CategoryService } from '../../services/category.service';
import { AsyncPipe } from '@angular/common';

const COMPONENTS = [MainListComponent, ColorsListComponent];
const PIPES = [AsyncPipe]

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  standalone: true,
  imports: [...COMPONENTS, ...PIPES],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryComponent {
  
  private readonly categoryService = inject(CategoryService);
}
