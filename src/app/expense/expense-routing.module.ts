import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InsertExpenseComponent} from './insert-expense/insert-expense.component';
import {ViewExpenseComponent} from './view-expense/view-expense.component';
import {AuthGuard} from '../auth/auth-guard.service';
import {ReportExpenseComponent} from './report-expense/report-expense.component';

const routes: Routes = [
  { path: 'report', canActivate: [ AuthGuard], component: ReportExpenseComponent },
  { path: 'create', canActivate: [ AuthGuard], component: InsertExpenseComponent },
  { path: 'edit/:id', canActivate: [ AuthGuard], component: InsertExpenseComponent },
  { path: 'view/:id', canActivate: [ AuthGuard], component: ViewExpenseComponent }
];

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ExpenseRoutingModule { }
