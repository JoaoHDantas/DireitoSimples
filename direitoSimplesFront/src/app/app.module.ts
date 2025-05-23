import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './login/login.component'; // Importar o LoginComponent
import { RegisterComponent } from './register/register.component'; // Importar o RegisterComponent
import { FormsModule } from '@angular/forms';
import { AuthInterceptor } from './auth.interceptor';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { InicionavbarComponent } from './inicionavbar/inicionavbar.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminLoginComponent } from './admin-login/admin-login.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginComponent,   
    RegisterComponent,
    HomeComponent,
    HttpClientModule, 
    FormsModule,
    NavbarComponent,
    InicionavbarComponent,
    ReactiveFormsModule,
    AdminLoginComponent,
  ],
  providers: [ {
    provide: HTTP_INTERCEPTORS,
    useClass:AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
