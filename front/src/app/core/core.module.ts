import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './components/layout/layout.component';
import {RouterModule} from "@angular/router";
import {ChipModule} from "primeng/chip";
import {AvatarModule} from "primeng/avatar";
import {MenuModule} from "primeng/menu";
import {SharedModule} from "../shared/shared.module";
import {SkeletonModule} from "primeng/skeleton";



@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ChipModule,
    AvatarModule,
    MenuModule,
    SharedModule,
    SkeletonModule
  ]
})
export class CoreModule { }
