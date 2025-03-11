import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component'; // Importar o LoginComponent
import { RegisterComponent } from './register/register.component'; // Importar o RegisterComponent
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';  // Importar FormsModule globalmente

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginComponent,   // Adicionando o LoginComponent nos imports
    RegisterComponent,
    HttpClientModule, // Adicionando o RegisterComponent nos imports
    FormsModule,
    NavbarComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
