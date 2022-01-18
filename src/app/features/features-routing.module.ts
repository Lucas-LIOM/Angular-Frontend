import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionGuard } from '../core/guards/permission.guard';
import { PageNotFoundComponent } from '../core/components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'people',
    pathMatch: 'full',
  },
  {
    path: 'people',
    canActivate: [PermissionGuard],
    loadChildren: async () =>
      import('./person/person.module').then((m) => m.PersonModule),
  },
  {
    path: 'animals',
    canActivate: [PermissionGuard],
    loadChildren: async () =>
      import('./animal/animal.module').then((m) => m.AnimalModule),
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeaturesRoutingModule {}
