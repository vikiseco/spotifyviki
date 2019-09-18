import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { Router } from '@angular/router';
import { FavoritosComponent } from '../favoritos/favoritos.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent implements OnInit {

  artistas:any[]= [];

  constructor(private router: Router, private spotify: SpotifyService) { 
    localStorage.removeItem('auth'); 
  }

  ngOnInit(){
    this.login();
  }

  buscar(valoringresado: string) {
    this.spotify.getArtistas( valoringresado )
          .subscribe( (data: any) => {
            this.artistas = data;
          });
          console.log(this.artistas);
  }
  login() {
    const currentUrl = this.router.url.split('access_token=')[1];
    const token: string = currentUrl ? currentUrl.split('&')[0] : null;
    if (token) {
      localStorage.setItem('auth', token);
    } else {
      this.spotify.auth();
    }
  }

}
