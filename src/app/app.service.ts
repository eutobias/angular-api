import { Injectable } from '@angular/core';
import { environment } from '../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor() { }

  public static getApiUrl(path):string {
    return `${environment.API_URL}${path}?api_key=${environment.API_KEY}`
  }
}
