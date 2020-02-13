import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Movies } from '../models/movies';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../app.service';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  movie = {} as Movies;
  constructor(private moviesService: MoviesService, private route: ActivatedRoute, private accountService: AccountService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = this.route.snapshot.paramMap.get("id")

      this.accountService.getAccount().then((data) => {
        this.accountService.account = data
        if (id)
          this.getMovie(id)
      })

    })
  }

  getMovie(id) {
    this.moviesService.getMovie(id).subscribe((movie) => {
      this.accountService.getBookmarksList().subscribe((bookmarks) => {
        this.accountService.bookmarks = bookmarks
        this.movie = movie
      })
    })
  }

  getPosterUrl(file) {
    return AppService.getPosterUrl(file)
  }

  getAverageRate(rate) {
    return AppService.getAverageRate(rate)
  }

}
