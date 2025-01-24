import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ICategory } from '../model/category.model';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private readonly apiUrl = environment.apiUrl;
  private readonly httpClient = inject(HttpClient);
  public categories = signal<ICategory[]>([]);

  public get(): Observable<ICategory[]> {
    return this.httpClient.get<ICategory[]>(`${this.apiUrl}/categories`)
    .pipe(tap(categories => this.categories.set(categories)));
  }

}
