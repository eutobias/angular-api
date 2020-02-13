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

  getMovie(id): Observable<Movies> {
    return this.http
      .get<Movies>(AppService.getApiUrl(`/movie/${id}`))
      .pipe(retry(2), catchError(this.handleError))
  }

  getBookmarkedMovies(accountId): Observable<Movies[]> {
    return this.http
      .get<Movies[]>(AppService.getAuthenticatedUrl(`/account/${accountId}/favorite/movies`))
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

  searchMovies(query):Observable<Movies> {
    return this.http
      .get<Movies>(AppService.getSearchUrl(`/search/movie`, query))
      .pipe(retry(2), catchError(this.handleError))
  }
}
