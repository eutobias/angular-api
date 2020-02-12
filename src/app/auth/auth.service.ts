import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  private _isAuthenticated: boolean = false;

  public isAuthenticaded(): boolean {
    const token = window.sessionStorage.getItem('requestToken')
    if (token) {
      this.setLoginSession()
    }

    return this._isAuthenticated
  }

  private requestToken: string = null;
  public async createRequestToken() { }

  public async login(username, password) {
    const reqToken: any = await this.http.get(
      AppService.getApiUrl('/authentication/token/new')
    ).toPromise()


    const reqLogin: any = await this.http.post(
      AppService.getApiUrl('/authentication/token/validate_with_login'),
      JSON.stringify({
        username,
        password,
        request_token: reqToken.request_token
      })
    ).toPromise()

    if (reqLogin.success) {
      const reqSession: any = await this.http.post(
        AppService.getApiUrl('/authentication/session/new'),
        JSON.stringify({
          request_token: reqToken.request_token
        })
      ).toPromise()

      window.sessionStorage.setItem('requestToken', reqToken.request_token)
      window.sessionStorage.setItem('sessionId', reqSession.session_id)

      this.setLoginSession()
      this.router.navigate(['home'])
    }
  }

  private setLoginSession() {
    this._isAuthenticated = true;
  }
}
