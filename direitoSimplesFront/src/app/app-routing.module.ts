// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { QuestionComponent } from './question/question.component';
import { SimuladoComponent } from './simulado/simulado.component';
import { SimuladoListComponent } from './simulado/simulado-list/simulado-list.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminAuthGuard } from './auth/admin-auth.guard';
import { ConquistasComponent } from './gamificacao/conquistas.component';
import { EstudoDiarioComponent } from './estudodiario/estudodiario/estudodiario.component';




const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  {path: 'questions/:id', component: QuestionComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'simulado/:id', component: SimuladoComponent},
  {path: 'simulados',component: SimuladoListComponent},
  { path: 'admin', component: AdminPanelComponent, canActivate: [AdminAuthGuard]},
  { path: 'admin/login', component: AdminLoginComponent },
  { path: 'conquistas', component: ConquistasComponent },
  { path: 'estudo-diario', component: EstudoDiarioComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
