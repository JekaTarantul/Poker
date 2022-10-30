import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {ReactiveFormsModule} from "@angular/forms";
import {CardModule} from "primeng/card";
import {TableComponent} from "./table.component";
import {TableUserComponent} from "./components/table-user/table-user.component";


const routes: Routes = [
  { path: '', component: TableComponent},
  { path: '**', redirectTo: ''}
]

@NgModule({
  declarations: [
    TableComponent,
    TableUserComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
})
export class TableModule { }
