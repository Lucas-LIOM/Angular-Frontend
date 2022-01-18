import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Animal } from '../../model/animal';

@Injectable({
  providedIn: 'root',
})
export class AnimalService {
  private baseUrl = `${environment.baseUrl}/animals`;

  constructor(private http: HttpClient) {}

  all(queryParams?: { query?: string; limit?: number }): Observable<Animal[]> {
    let params = {};

    if (queryParams) {
      const { query, limit } = queryParams;

      params = query ? { q: query } : {};
      params = limit ? { ...params, ...{ _limit: limit } } : params;
    }

    return this.http.get<Animal[]>(this.baseUrl, { params });
  }

  getOne(id: number): Observable<Animal> {
    return this.http.get<Animal>(`${this.baseUrl}/${id}`);
  }

  delete(id: number): Observable<unknown> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  upsert(animal: Animal) {
    if (animal.id) {
      return this.http.patch<Animal>(`${this.baseUrl}/${animal.id}`, animal);
    } else {
      return this.http.post<Animal>(this.baseUrl, animal);
    }
  }
}
