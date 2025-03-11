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
import { NavbarComponent } from './navbar/navbar.component';  // Importar FormsModule globalmente

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
    FormsModule
    HttpClientModule, // Adicionando o RegisterComponent nos imports
    FormsModule,
    NavbarComponent
  ],
  providers: [ {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true  // Permitindo múltiplos interceptores
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
