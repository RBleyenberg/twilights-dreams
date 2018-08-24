import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import {AuthService} from '../../auth/auth.service';
import {ExpenseService} from '../expense.service';

@Component({
  selector: 'app-insert-expense',
  templateUrl: './insert-expense.component.html',
  styleUrls: ['./insert-expense.component.scss']
})
export class InsertExpenseComponent implements OnInit {

  expenseForm: FormGroup;
  userObj: any;
  acc: any = ['Food', 'Fees', 'Rent', 'Fare', 'Travel', 'Hotel', 'Phone', 'Internet', 'Repairs', 'Gas', 'Doctor', 'Books', 'Gift', 'Restaurant', 'Electricity', 'Other'];
  expid: string;
  pgTitle: string;
  btnLbl: string;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private expenseService: ExpenseService,
              private route: ActivatedRoute,
              private router: Router,
              private datePipe: DatePipe) {
  }

  expdate = new FormControl('', [Validators.required]);
  expaccount = new FormControl('', [Validators.required]);
  expamt = new FormControl('', [Validators.required, Validators.pattern('[0-9]+(\.[0-9][0-9]?)?')]);
  expdesc = new FormControl();

  ngOnInit() {

    this.route.params.subscribe((params: any) => {
      if (params.id) {
        this.expid = params['id'];
        this.getExpense(this.expid);
        this.pgTitle = 'Edit';
        this.btnLbl = 'Update';
      } else {
        this.pgTitle = 'Add';
        this.btnLbl = 'Submit';
      }
    });

    this.userObj =  this.authService.currentUser;
    this.expenseForm = this.fb.group({
      expdate: this.expdate,
      expaccount: this.expaccount,
      expamt: this.expamt,
      expdesc: this.expdesc
    });
  }

  getExpense(id) {
    this.expenseService.getExpense(id).subscribe(data => {
      if (data.success === true) {
        if (data.data[0]) {
          this.populateForm(data.data[0]);
        } else {
        //  this.toastr.error('Expense id is incorrect in the URL');
          this.router.navigate(['report']);
        }
      }
    });
  }

  populateForm(data): void {
    this.expenseForm.patchValue({
      expdate: this.datePipe.transform(data.expensedate, 'y-MM-dd'),
      expaccount: data.expensetype,
      expamt: data.expenseamt,
      expdesc: data.expensedesc
    });
  }

  saveExpense(formdata: any): void {
    if (this.expenseForm.valid) {
      const theForm = this.expenseForm.value;
      if (this.expid !== '') {
        theForm.expid = this.expid;
      }

      this.expenseService.saveExpense(this.userObj.userid, theForm)
        .subscribe(data => {
          if (data.success === false) {
            if (data.errcode) {
              this.authService.logout();
              this.router.navigate(['expense/report']);
            }
          //  this.toastr.error(data.message);
          } else {
          //  this.toastr.success(data.message);
          }
          if (!this.expid) {
            this.expenseForm.reset();
          }
        });
    }
  }

  onBack(): void {
    this.router.navigate(['expense/report'], { preserveQueryParams: true });
  }

}
