import { Injectable, NgModule } from '@angular/core';
import {
  ActivatedRouteSnapshot, Resolve, RouterModule, Routes
} from '@angular/router';
import { Observable } from 'rxjs';
import { Person } from 'src/app/core/model/person';
import { PeopleService } from 'src/app/core/services/people/people.service';
import { FormComponent } from './form/form.component';
import { ListComponent } from './list/list.component';

@Injectable()
export class PeopleDataResolver implements Resolve<Person[]> {
  constructor(private peopleService: PeopleService) {}

  resolve() {
    return this.peopleService.all();
  }
}

@Injectable()
export class PersonDataResolver implements Resolve<Person> {
  constructor(private peopleService: PeopleService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Person> {
    return this.peopleService.getOne(route.params.id);
  }
}

const routes: Routes = [
  {
    path: '',
    component: ListComponent,
    resolve: {
      entities: PeopleDataResolver,
    },
  },
  {
    path: 'add',
    component: FormComponent,
  },
  {
    path: ':id',
    component: FormComponent,
    resolve: {
      entity: PersonDataResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [PeopleDataResolver, PersonDataResolver],
})
export class PersonRoutingModule {}
