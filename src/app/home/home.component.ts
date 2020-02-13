import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MoviesService } from '../services/movies.service';
import { Movies } from '../models/movies';
import { AppService } from '../app.service';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

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
    this.moviesService.getMovies().subscribe((movies) => {
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
