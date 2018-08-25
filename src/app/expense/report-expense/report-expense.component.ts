import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DatePipe } from '@angular/common';
import {IExpense} from '../expense.model';
import {AuthService} from '../../auth/auth.service';
import {ExpenseService} from '../expense.service';
import {MatGridList, MatSort} from '@angular/material';
import {MediaChange, ObservableMedia} from '@angular/flex-layout';

@Component({
  selector: 'app-report-expense',
  templateUrl: './report-expense.component.html',
  styleUrls: ['./report-expense.component.scss']
})
export class ReportExpenseComponent  implements OnInit {

  @ViewChild('grid') grid: MatGridList;
  @ViewChild(MatSort) sort: MatSort;

  gridByBreakpoint = {
    xl: 2,
    lg: 2,
    md: 2,
    sm: 1,
    xs: 1
  };

  reportForm: FormGroup;
  userObj: any;
  reportTitle: string;
  expenses: IExpense[];
  totalrows: number;
  qreport: string;
  qstartdt: string;
  qenddt: string;
  exptotal: number;

  displayedColumns: string[] = ['expensetype', 'expensedate', 'expenseamt', 'expensedesc'];



  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private expenseService: ExpenseService,
              private route: ActivatedRoute,
              private router: Router,
              private observableMedia: ObservableMedia,
              private datePipe: DatePipe) {}
  report = new FormControl('opt1');
  startdt = new FormControl({value: '', disabled: true});
  enddt = new FormControl({value: '', disabled: true});


  ngOnInit() {


  // this.expenses.sort = this.sort;

    this.userObj =  this.authService.currentUser;
    this.reportForm = this.fb.group({
      report: this.report,
      startdt: this.startdt,
      enddt: this.enddt
    });

    this.route.queryParams.forEach((params: Params) => {
      this.qreport = params['report'] || '';
      this.qstartdt = params['startdt'] || '';
      this.qenddt = params['enddt'] || '';

      if (this.qreport !== '') {
        const payload: any = {};
        payload.report = this.qreport;
        if ( (this.qstartdt !== '' && this.qenddt !== '')) {
          payload.startdt = this.qstartdt;
          payload.enddt = this.qenddt;

          this.reportForm.get('startdt').enable();
          this.reportForm.get('enddt').enable();
        }
        this.fetchReport(this.userObj.userid, payload);


        this.reportForm.patchValue({
          report: this.qreport,
          startdt: this.qstartdt,
          enddt: this.qenddt
        });
      }
    });

    this.reportForm.get('report').valueChanges.subscribe(value => this.toggleDates(value));

  }

  ngAfterContentInit() {
    this.observableMedia.asObservable().subscribe((change: MediaChange) => {
      this.grid.cols = this.gridByBreakpoint[change.mqAlias];
    });
  }

  toggleDates(opt: string): void {
    const dt1Control = this.reportForm.get('startdt');
    const dt2Control = this.reportForm.get('enddt');
    if (opt === 'opt2') {
      dt1Control.setValidators(Validators.required);
      dt2Control.setValidators(Validators.required);
      dt1Control.enable();
      dt2Control.enable();
    } else {
      dt1Control.clearValidators();
      dt2Control.clearValidators();
      dt1Control.disable();
      dt2Control.disable();
      dt1Control.setValue('');
      dt2Control.setValue('');
    }
    dt1Control.updateValueAndValidity();
    dt2Control.updateValueAndValidity();
  }

  getReport(formdata: any): void {
    if (this.reportForm.valid) {
      if (this.reportForm.value.report === 'opt2' && (new Date(this.reportForm.value.startdt) > new Date(this.reportForm.value.enddt))) {
      //  this.toastr.error('Start date cannot be greater than end date.');
      } else {
        this.fetchReport(this.userObj.userid, this.reportForm.value);
      }
    }
  }

  fetchReport(userid, formval) {
    this.expenseService.getExpenses(userid, formval)
      .subscribe(data => {
        if (data.success === false) {
          if (data.errcode) {
            this.authService.logout();
            this.router.navigate(['login']);
          }
        //  this.toastr.error(data.message);
        } else {
          this.expenses = data.data.docs;
          console.log("payload" + JSON.stringify(this.expenses));
          this.totalrows = +data.data.total;
          this.qreport = formval.report;
          if (formval.startdt) {
            this.qstartdt = formval.startdt;
            this.qenddt = formval.enddt;
          }

          this.expenseService.getExpenseTotal(userid, formval)
            .subscribe(data => {
              this.exptotal = data.data[0];
            });

          if (formval.report === 'opt1') {
            this.reportTitle = 'for ' + this.datePipe.transform(new Date(), 'dd-MM-y');
          } else if (formval.report === 'opt2') {
            this.reportTitle = 'between ' + this.datePipe.transform(new Date(formval.startdt), 'dd-MM-y') + ' and ' + this.datePipe.transform(new Date(formval.enddt), 'dd-MM-y');
          } else {
            this.reportTitle = 'for all expenses';
          }
        }
      });
  }

  showExpense(expid): void {
    this.router.navigate([`expense/view/${expid}`],
      {
        queryParams: { report: this.qreport, startdt: this.qstartdt, enddt: this.qenddt }
      }
    );
  }

  confirmDel(idx: number, expid: string) {
    if (confirm('Do you really want to delete this record?')) {
      this.expenseService.delExpense(expid)
        .subscribe(data => {
          if (data.success === false) {
            if (data.errcode) {
              this.authService.logout();
              this.router.navigate(['login']);
            }
       //     this.toastr.error(data.message);
          } else {

            this.expenses.splice(idx, 1);

         //   this.toastr.success(data.message);
          }
        });
    }
  }

  editExpense(expid): void {
    this.router.navigate([`expense/edit/${expid}`],
      {
        queryParams: { report: this.qreport, startdt: this.qstartdt, enddt: this.qenddt }
      }
    );
  }




}
