import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ICategory } from '../model/category.model';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private readonly apiUrl = environment.apiUrl;
  private readonly httpClient = inject(HttpClient);
  private readonly categories$ = this.httpClient.get<ICategory[]>(`${this.apiUrl}/categories`);
  public categories = toSignal(this.categories$, {
    initialValue: [] as ICategory[]
  });

}
