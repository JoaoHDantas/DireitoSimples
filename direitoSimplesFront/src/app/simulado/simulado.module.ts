import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SimuladoRoutingModule } from './simulado-routing.module';
import { SimuladoComponent } from './simulado.component';


@NgModule({
  declarations: [
    SimuladoComponent
  ],
  imports: [
    CommonModule,
    SimuladoRoutingModule
  ]
})
export class SimuladoModule { }
