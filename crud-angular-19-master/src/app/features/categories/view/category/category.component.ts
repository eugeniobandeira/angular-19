import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ColorsListComponent } from '../../components/colors-list/colors-list.component';
import { MainListComponent } from "../../components/main-list/main-list.component";

const COMPONENTS = [MainListComponent, ColorsListComponent];

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  standalone: true,
  imports: [...COMPONENTS],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryComponent {
  
}
