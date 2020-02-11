import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppService } from '../app.service';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http:HttpClient) { }

  async getMovies() {

    const request: any = await this.http.get(AppService.getApiUrl('/movie/popular')).toPromise()

    console.log(request)
  }
}
