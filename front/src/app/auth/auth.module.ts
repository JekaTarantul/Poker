import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import {RouterModule, Routes} from "@angular/router";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";


const routes: Routes = [
  { path: '', component: AuthComponent, children: [
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent }
    ] },
]

@NgModule({
  declarations: [
    AuthComponent,
    SignupComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    InputTextModule,
    ButtonModule
  ]
})
export class AuthModule { }
