import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import { TMDAccount } from '../models/account';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  account = {} as TMDAccount;
  avatar = "";
  username = "";
  name = "";
  accountId = "";
  bookmarkList = []
  bookmarkCount = 0
  showBookmarksMenu = false
  menuVisible = false

  constructor(private accountService: AccountService, private router:Router) { }

  ngOnInit(): void {
    this.getAccount()

    if (!AppService.isMobile())
      this.menuVisible = true
  }

  getAccount() {
    this.accountService.getAccount().then((account) => {
      this.accountService.account = account

      this.account = account
      this.avatar = "https://www.gravatar.com/avatar/" + account.avatar.gravatar.hash
      this.username = account.username
      this.name = account.name
      this.accountId = account.id

      this.accountService.getBookmarksList().subscribe((bookmarks) => {
        this.accountService.bookmarks = bookmarks
        this.bookmarkList = bookmarks.results
        this.bookmarkCount = bookmarks.results.length
      })
    })
  }

  getPosterUrl(file) {
    return AppService.getPosterUrl(file)
  }

  toggleDropdown() {
    if (!AppService.isMobile())
      this.showBookmarksMenu = !this.showBookmarksMenu
    else {
      if (this.menuVisible) {
        this.router.navigate(['/bookmarks'])
        this.toggleMenu()
      }
    }
  }

  toggleMenu() {
    this.menuVisible = !this.menuVisible
  }

}
