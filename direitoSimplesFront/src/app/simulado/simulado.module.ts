import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SimuladoRoutingModule } from './simulado-routing.module';
import { SimuladoComponent } from './simulado.component';
import { SimuladoListComponent } from './simulado-list/simulado-list.component';


@NgModule({
  declarations: [
    SimuladoListComponent
  ],
  imports: [
    CommonModule,
    SimuladoRoutingModule,
    SimuladoComponent
  ]
})
export class SimuladoModule { }
