import { Component, OnInit, Input } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-bookmark-button',
  templateUrl: './bookmark-button.component.html',
  styleUrls: ['./bookmark-button.component.scss']
})
export class BookmarkButtonComponent implements OnInit {

  @Input('movieId')
  movieId: any;

  isSelected: boolean = false;

  constructor(private moviesService: MoviesService, private accountService: AccountService) { }

  ngOnInit(): void {
    this.checkIsSelected()
  }

  toggleImage() {
    const favorite = !this.isSelected
    this.accountService.bookmarkMovie(this.movieId, favorite).subscribe((data) => {
      this.isSelected = favorite
    })
  }

  checkIsSelected() {
    const bookmarks = this.accountService.bookmarks;
    const result = bookmarks.results.filter((v) => v.id == this.movieId)

    if (result && result.length > 0)
      this.isSelected = true
  }

}
