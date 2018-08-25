import {Component, NgZone, OnInit, ViewChild} from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import {AuthService} from '../../auth/auth.service';
import {ExpenseService} from '../expense.service';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-insert-expense',
  templateUrl: './insert-expense.component.html',
  styleUrls: ['./insert-expense.component.scss']
})
export class InsertExpenseComponent implements OnInit {

  expenseForm: FormGroup;
  userObj: any;
  acc: any = ['Eten', 'Huur', 'Reizen', 'Hotel', 'Telefoon', 'Internet', 'Auto', 'Restaurant', 'Anders'];
  expid: string;
  pgTitle: string;
  btnLbl: string;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private expenseService: ExpenseService,
              private route: ActivatedRoute,
              private router: Router,
              private ngZone: NgZone,
              private snackbar: MatSnackBar,
              private datePipe: DatePipe) {
  }

  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  expenseDate = new FormControl('', [Validators.required]);
  expenseAccount = new FormControl('', [Validators.required]);
  expenseAmount = new FormControl('', [Validators.required, Validators.pattern('[0-9]+(\.[0-9][0-9]?)?')]);
  expenseDescription = new FormControl();

  ngOnInit() {

    this.route.params.subscribe((params: any) => {
      if (params.id) {
        this.expid = params['id'];
        this.getExpense(this.expid);
        this.pgTitle = 'Edit';
        this.btnLbl = 'Update';
      } else {
        this.pgTitle = 'Nieuwe';
        this.btnLbl = 'Verstuur';
      }
    });

    this.userObj =  this.authService.currentUser;
    this.expenseForm = this.fb.group({
      expenseDate: this.expenseDate,
      expenseAccount: this.expenseAccount,
      expenseAmount: this.expenseAmount,
      expenseDescription: this.expenseDescription
    });
  }

  getExpense(id) {
    this.expenseService.getExpense(id).subscribe(data => {
      if (data.success === true) {
        if (data.data[0]) {
          this.populateForm(data.data[0]);
        } else {
          this.snackbar.open('uitgave ID is niet goed in de URL', '', {duration: 2000});
          this.router.navigate(['report']);
        }
      }
    });
  }

  populateForm(data): void {
    this.expenseForm.patchValue({
      expenseDate: this.datePipe.transform(data.expenseDate, 'dd-MM-y'),
      expenseAccount: data.expenseType,
      expenseAmount: data.expenseAmount,
      expenseDescription: data.expenseDescription
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
            this.snackbar.open(data.message, '', {duration: 3000});
          } else {
            this.snackbar.open(data.message, '', {duration: 3000});
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
