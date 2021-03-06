import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import {MatSnackBar} from '@angular/material';


@Injectable()
export class ExpenseService {

  public jwtToken: string;

  constructor(private http: Http, private snackbar: MatSnackBar) {
    const theUser: any = JSON.parse(localStorage.getItem('currentUser'));
    if (theUser) {
      this.jwtToken = theUser.token;
    }
  }

  saveExpense(userid, oExpense) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `${this.jwtToken}`);
    const options = new RequestOptions({ headers: headers });

    return this.http.post(`http://localhost:1978/api/expense/${userid}`, JSON.stringify(oExpense), options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  getExpenses(userid, oExpense) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `${this.jwtToken}`);
    const options = new RequestOptions({ headers: headers });

    return this.http.post(`http://localhost:1978/api/expense/report/${userid}`, JSON.stringify(oExpense), options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  getExpenseTotal(userid, oExpense) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `${this.jwtToken}`);
    const options = new RequestOptions({ headers: headers });

    return this.http.post(`http://localhost:1978/api/expense/total/${userid}`, JSON.stringify(oExpense), options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  getExpense(expid) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `${this.jwtToken}`);
    const options = new RequestOptions({ headers: headers });

    return this.http.get(`http://localhost:1978/api/expense/${expid}`, options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  delExpense(expid) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `${this.jwtToken}`);
    const options = new RequestOptions({ headers: headers });

    return this.http.delete(`http://localhost:1978/api/expense/${expid}`, options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

   handleError(error: Response) {
    console.error(error);
    this.testSnackbar();
    return Observable.throw(error.json().error || 'Server error');

  }

  testSnackbar(){
    this.snackbar.open('Server error', '', {
      duration: 2000,
    });
  }

}
