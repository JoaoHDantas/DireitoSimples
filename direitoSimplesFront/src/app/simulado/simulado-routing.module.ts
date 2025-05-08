import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SimuladoComponent } from './simulado.component';

const routes: Routes = [{ path: ':id', component: SimuladoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SimuladoRoutingModule { }
