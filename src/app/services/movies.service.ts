import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { AppService } from '../app.service'
import { Movies } from '../models/movies'
import { Observable, throwError } from 'rxjs'
import { retry, catchError } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  constructor(private http: HttpClient) { }

  getMovies(): Observable<Movies[]> {
    return this.http
      .get<Movies[]>(AppService.getApiUrl('/movie/popular'))
      .pipe(retry(2), catchError(this.handleError))
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = ''
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message
    } else {
      errorMessage =
        `Código do erro: ${error.status}, ` + `mensagem: ${error.message}`
    }
    console.log(errorMessage)
    return throwError(errorMessage)
  }
}
