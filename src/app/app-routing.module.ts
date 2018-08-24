import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AboutComponent} from './about/about.component';

const routes: Routes = [
  { path: 'about', component: AboutComponent},
  {
    path: 'user',
    loadChildren: './user/user.module#UserModule'
  },
  {
    path: 'expense',
    loadChildren: './expense/expense.module#ExpenseModule'
  },
  { path: '', redirectTo: 'about', pathMatch: 'full' },
  { path: '**', redirectTo: 'about', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
