import {NgModule} from '@angular/core';
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
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    ExpenseRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule
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
    ExpenseService,
    {provide: MAT_DATE_LOCALE, useValue: 'nl-NL'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ]
})
export class ExpenseModule { }
