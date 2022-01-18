import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Person } from '../../model/person';

@Injectable({
  providedIn: 'root',
})
export class PeopleService {
  private _person = new Subject<Person>();

  private baseUrl = `${environment.baseUrl}/people`;

  constructor(private http: HttpClient) {}

  all(query?: string) {
    const params = query ? { params: { q: query } } : {};
    return this.http.get<Person[]>(this.baseUrl, params);
  }

  getOne(id: number) {
    return this.http.get<Person>(`${this.baseUrl}/${id}`);
  }

  delete(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  upsert(person: Person) {
    person.age = Number(person.age);

    if (person.id) {
      return this.http.patch<Person>(`${this.baseUrl}/${person.id}`, person);
    } else {
      return this.http.post<Person>(this.baseUrl, person);
    }
  }

  getPerson(): Observable<Person> {
    return this._person.asObservable();
  }

  setPerson(person: Person) {
    this._person.next(person);
  }
}
