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
  }

  onSubmit(data) {
    const login = this.loginForm.value.login
    const password = this.loginForm.value.password
    if (login && password)
    {
      this.auth.login(login, password)
      this.loginForm.reset()
    }
    return
  }

}
