import { Injectable } from '@angular/core';
import { environment } from '../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor() { }

  public static getApiKey(): string {
    return environment.API_KEY
  }

  public static getApiToken(): string {
    return environment.API_TOKEN
  }

  public static getApiUrl(path): string {
    return `${environment.API_URL}${path}?api_key=${environment.API_KEY}&language=pt-BR`
  }

  public static getAuthenticatedUrl(path): string {
    const session_id = window.sessionStorage.getItem('sessionId')
    return `${environment.API_URL}${path}?api_key=${environment.API_KEY}&session_id=${session_id}&language=pt-BR`
  }

  public static getSearchUrl(path, query): string {
    const session_id = window.sessionStorage.getItem('sessionId')
    return `${environment.API_URL}${path}?api_key=${environment.API_KEY}&session_id=${session_id}&language=pt-BR&query=${query}`
  }

  public static getPosterUrl(file) {
    return `https://image.tmdb.org/t/p/w500/${file}`
  }

  public static getAverageRate(rate) {
    return `${rate * 10}%`
  }

  public static isMobile() {
    const w = window,
      d = document,
      e = d.documentElement,
      g = d.getElementsByTagName('body')[0],
      x = w.innerWidth || e.clientWidth || g.clientWidth

      return x < 768
  }
}
