import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardsService } from './auth/auth-guards.service';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
import { DetailsComponent } from './details/details.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home', component: HomeComponent,
    canActivate: [AuthGuardsService]
  },
  {
    path: 'bookmarks', component: BookmarksComponent,
    canActivate: [AuthGuardsService]
  },
  {
    path: 'details', component: DetailsComponent,
    canActivate: [AuthGuardsService]
  },
  { path: 'login', component: LoginComponent },

  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
