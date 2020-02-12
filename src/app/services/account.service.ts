import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AppService } from '../app.service';
import { retry, catchError } from 'rxjs/operators';
import { TMDAccount } from '../models/account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  getAccount(): Observable<TMDAccount> {
    return this.http
      .get<TMDAccount>(AppService.getAuthenticatedUrl('/account'))
      .pipe(retry(1), catchError(this.handleError))
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = ''
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message
    } else {
      errorMessage =
        `Código do erro: ${error.status}, ` + `mensagem: ${error.message}`
    }
    return throwError(errorMessage)
  }

}
