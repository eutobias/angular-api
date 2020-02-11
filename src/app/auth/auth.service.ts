import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(private http: HttpClient, private router: Router) { }
  private _isAuthenticated:boolean = false;
  public isAuthenticaded(): boolean {
    const token = window.sessionStorage.getItem('requestToken')
    if (token) {
      this.setLoginSession(token)
    }

    return this._isAuthenticated
  }

  private requestToken: string = null;
  public async createRequestToken() {
    if (this.requestToken)
      return

    const request: any = await this.http.get(AppService.getApiUrl('/authentication/token/new')).toPromise()

    if (request.success)
      this.requestToken = request.request_token
  }

  public async login(username: string, password: string) {
    const data = {
      username, password, request_token: this.requestToken
    }
    const request: any = await this.http.post(
      AppService.getApiUrl('/authentication/token/validate_with_login'),
      JSON.stringify(data),
      this.httpOptions).toPromise()

    if (request.success) {
      this.setLoginSession(request.request_token)
      this.router.navigate(['home'])
    }
  }

  private setLoginSession(request_token) {
    this.requestToken = request_token
    this._isAuthenticated = true;
    window.sessionStorage.setItem('requestToken', request_token)
  }
}
