import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import { TMDAccount } from '../models/account';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  account = {} as TMDAccount;
  avatar = "";
  username = "";

  constructor(private accountService:AccountService) { }

  ngOnInit(): void {
    this.getAccount()
  }

  getAccount() {
    this.accountService.getAccount().subscribe((account) => {
      this.account = account

      this.avatar = "https://www.gravatar.com/avatar/" + this.account.avatar.gravatar.hash
      this.username = this.account.username

    })
  }

  getGravatarImage(hash) {

  }
}
