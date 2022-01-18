import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormComponent } from './form/form.component';
import { ListComponent } from './list/list.component';

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Animal } from 'src/app/core/model/animal';
import { AnimalService } from 'src/app/core/services/animal/animal.service';

@Injectable()
export class AnimalsDataResolver implements Resolve<Animal[]> {
  constructor(private animalService: AnimalService) {}

  resolve(): Observable<Animal[]> {
    return this.animalService.all();
  }
}

@Injectable()
export class AnimalDataResolver implements Resolve<Animal> {
  constructor(private animalService: AnimalService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Animal> {
    return this.animalService.getOne(route.params.id);
  }
}

const routes: Routes = [
  {
    path: '',
    component: ListComponent,
    resolve: {
      entities: AnimalsDataResolver,
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
      entity: AnimalDataResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AnimalsDataResolver, AnimalDataResolver],
})
export class AnimalRoutingModule {}
