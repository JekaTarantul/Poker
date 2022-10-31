import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingStatePipe } from './pipes/loading-state.pipe';



@NgModule({
  declarations: [
    LoadingStatePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LoadingStatePipe
  ]
})
export class SharedModule { }
