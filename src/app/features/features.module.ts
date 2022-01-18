import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeaturesRoutingModule } from './features-routing.module';
import { PersonModule } from './person/person.module';
import { AnimalModule } from './animal/animal.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, FeaturesRoutingModule, PersonModule, AnimalModule],
  exports: [],
})
export class FeaturesModule {}
