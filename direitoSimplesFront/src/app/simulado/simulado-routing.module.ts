import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SimuladoComponent } from './simulado.component';

const routes: Routes = [{ path: '', component: SimuladoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SimuladoRoutingModule { }
