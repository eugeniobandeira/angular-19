import { ChangeDetectionStrategy, Component } from '@angular/core';
import { InclusionFormComponent } from '../../components/inclusion-form/inclusion-form.component';

const COMPONENTS = [InclusionFormComponent];
@Component({
    selector: 'app-task',
    imports: [...COMPONENTS],
    templateUrl: './task.component.html',
    styleUrl: './task.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
})
export class TaskComponent {

}
