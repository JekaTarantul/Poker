import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LayoutComponent} from "./core/components/layout/layout.component";
import {AuthorisedGuard} from "./core/guards/authorised.guard";

const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  { path: '', canActivate: [AuthorisedGuard], component: LayoutComponent, children: [
      { path: 'rooms', loadChildren: () => import('./rooms/rooms.module').then(m => m.RoomsModule)},
      { path: 'table', loadChildren: () => import('./table/table.module').then(m => m.TableModule) },
  ]},
  { path: '**', redirectTo: 'auth'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
