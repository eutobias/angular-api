import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AppService } from '../app.service';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  account: any;
  bookmarks: any;

  constructor(private http: HttpClient) { }

  getAccount() {
    if (this.account)
      return Promise.resolve(this.account)

    return this.http.get(AppService.getAuthenticatedUrl('/account')).toPromise()
  }

  getBookmarksList(): Observable<any> {
    if (this.account) {
      const accountId = this.account.id
      return this.http
        .get(AppService.getAuthenticatedUrl(`/account/${accountId}/favorite/movies`))
        .pipe(retry(1), catchError(this.handleError))
    }
  }

  bookmarkMovie(movieId, favorite) {
    return this.http.post(
      AppService.getAuthenticatedUrl(`/account/${this.account.id}/favorite`),
      JSON.stringify({
        "media_type": "movie",
        "media_id": movieId,
        "favorite": favorite
      }))
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
