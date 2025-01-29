import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { ITask } from '../model/task.model';
import { environment } from '../../../../environments/environment';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private readonly _httpClient = inject(HttpClient);
  private readonly _apiUrl = environment.apiUrl;

  public tasks = signal<ITask[]>([]);
  public numberOfTasks = computed(() => this.tasks().length);

  public get(): Observable<ITask[]> { 
    return this._httpClient.get<ITask[]>(`${this._apiUrl}/tasks`)
    .pipe(tap(tasks => {
      const sortedTasks = this.getSorted(tasks);
      this.tasks.set(sortedTasks);
    }));
  }

  public getSorted(tasks: ITask[]): ITask[] {
    return tasks.sort((a, b) => a.title?.localeCompare(b.title));
  }

  public create(payload: Partial<ITask>): Observable<ITask> {
    return this._httpClient.post<ITask>(`${this._apiUrl}/tasks`, payload)
    .pipe(tap(tasks => this.updateTaskInList(tasks)));
  }

  public update(updated: ITask): Observable<ITask> {
    return this._httpClient.put<ITask>(`${this._apiUrl}/tasks/${updated.id}`, updated)
    .pipe(tap(task => this.updateTaskInList(task)));
  }

  public updateList(newTask: ITask): void {
    const updatedTasks = [...this.tasks(), newTask];
    const sortedTasks = this.getSorted(updatedTasks);

    this.tasks.set(sortedTasks);
  }

  public updateTaskInList(updatedTask: ITask): void {
    this.tasks.update(tasks => {
      const allTasksWithUpdatedTaskRemoved = tasks.filter(task => task.id !== updatedTask.id);

      const updatedTaskList = [...allTasksWithUpdatedTaskRemoved, updatedTask];

      return this.getSorted(updatedTaskList);
    });
  }

  public patchIsCompletedStatus(taskId: string, isCompleted: boolean): Observable<ITask> {
    return this._httpClient.patch<ITask>(`${this._apiUrl}/tasks/${taskId}`, { 
      isCompleted 
    }).pipe(tap(task => this.updateTaskInList(task)));
  }

  public delete(taskId: string): Observable<ITask> {
    return this._httpClient.delete<ITask>(`${this._apiUrl}/tasks/${taskId}`)
    .pipe(tap(() => this.deleteTaskFromList(taskId)));
  }

  public deleteTaskFromList(taskId: string): void {
    this.tasks.update(tasks => tasks.filter(task => task.id !== taskId));
  }
  
}
