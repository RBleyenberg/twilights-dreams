import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';

import { ExpenseRoutingModule } from './expense-routing.module';
import { InsertExpenseComponent } from './insert-expense/insert-expense.component';
import { ViewExpenseComponent } from './view-expense/view-expense.component';
import { AuthService } from '../auth/auth.service';
import { AuthGuard } from '../auth/auth-guard.service';
import { ExpenseService } from './expense.service';
import { ReportExpenseComponent } from './report-expense/report-expense.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MaterialModule} from '../material.module';

@NgModule({
  imports: [
    CommonModule,
    ExpenseRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [
    InsertExpenseComponent,
    ViewExpenseComponent,
    ReportExpenseComponent
  ],
  providers: [
    DatePipe,
    AuthService,
    AuthGuard,
    ExpenseService
  ]
})
export class ExpenseModule { }
