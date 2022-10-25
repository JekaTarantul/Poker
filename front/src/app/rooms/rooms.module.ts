import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {ReactiveFormsModule} from "@angular/forms";
import {RoomsComponent} from "./rooms.component";


const routes: Routes = [
  { path: '', component: RoomsComponent},
  { path: '**', redirectTo: ''}
]

@NgModule({
  declarations: [
    RoomsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule,
  ],
})
export class RoomsModule { }
