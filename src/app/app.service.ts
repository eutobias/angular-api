import { Injectable } from '@angular/core';
import { environment } from '../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor() { }

  public static getApiKey():string {
    return environment.API_KEY
  }

  public static getApiToken():string {
    return environment.API_TOKEN
  }

  public static getApiUrl(path):string {
    return `${environment.API_URL}${path}?api_key=${environment.API_KEY}`
  }

  public static getAuthenticatedUrl(path):string {
    const session_id = window.sessionStorage.getItem('sessionId')
    return `${environment.API_URL}${path}?api_key=${environment.API_KEY}&session_id=${session_id}`
  }
}
