import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-task',
    imports: [],
    templateUrl: './task.component.html',
    styleUrl: './task.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
})
export class TaskComponent {

}
