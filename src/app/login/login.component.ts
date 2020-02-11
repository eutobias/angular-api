import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm;

  constructor(private auth: AuthService, private router: Router,
    private formBuilder: FormBuilder, ) {
      this.loginForm = this.formBuilder.group({
        login: '',
        password: ''
      });
    }

  ngOnInit(): void {
    this.auth.createRequestToken()
  }

  onSubmit(data) {
    if (this.loginForm.value.login && this.loginForm.value.password)
    {
      this.auth.login(this.loginForm.value.login, this.loginForm.value.password)
      this.loginForm.reset()
    }
    return
  }

}
