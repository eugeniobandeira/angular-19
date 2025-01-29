import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ICategory } from '../model/category.model';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private readonly _apiUrl = environment.apiUrl;
  private readonly _httpClient = inject(HttpClient);
  private readonly _categories$ = this._httpClient.get<ICategory[]>(`${this._apiUrl}/categories`);
  
  public categories = toSignal(this._categories$, {
    initialValue: [] as ICategory[]
  });

  public selectedCategoryId = signal('1');
}
