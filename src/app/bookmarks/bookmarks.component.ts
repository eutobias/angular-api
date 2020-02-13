import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MoviesService } from '../services/movies.service';
import { Movies } from '../models/movies';
import { AppService } from '../app.service';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss']
})
export class BookmarksComponent implements OnInit {

  movie = {} as Movies;
  movies: Movies[];
  bookmarks: any;
  searchForm;

  constructor(private moviesService: MoviesService, private accountService: AccountService, private formBuilder: FormBuilder) {
    this.searchForm = this.formBuilder.group({
      query: ''
    });
  }

  ngOnInit(): void {
    this.accountService.getAccount().then((data) => {
      this.accountService.account = data
      this.getMovies()
    })
  }

  getMovies() {
    const accountId = this.accountService.account.id
    this.moviesService.getBookmarkedMovies(accountId).subscribe((movies) => {
      this.accountService.getBookmarksList().subscribe((bookmarks) => {
        this.accountService.bookmarks = bookmarks
        this.bookmarks = bookmarks;
        this.movies = (movies as any).results
      })
    })
  }

  getPosterUrl(file) {
    return AppService.getPosterUrl(file)
  }

  getAverageRate(rate) {
    return AppService.getAverageRate(rate)
  }

  onSubmit(data) {
    const query = this.searchForm.value.query
    if (query) {
      this.moviesService.searchMovies(query).subscribe((movies) => {
        this.accountService.getBookmarksList().subscribe((bookmarks) => {
          this.accountService.bookmarks = bookmarks
          this.bookmarks = bookmarks;
          this.movies = (movies as any).results
        })
      })
    }
    return
  }

}
