import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Movies } from '../models/movies';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  movie = {} as Movies;
  movies: Movies[];

  constructor(private moviesService:MoviesService) { }

  ngOnInit(): void {
    this.getMovies()
  }

  getMovies() {
    this.moviesService.getMovies().subscribe((movies) => {
      this.movies = (movies as any).results
    })
  }

}
