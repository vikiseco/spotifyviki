import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

//importar map reactive extentions
import { map } from "rxjs/operators";

// Por lo general cuando se trabaja con API
// Es necesario Centralizar la Informacion por eso este Service

// Este servicio se va a poder Inyectar en otros Componentes
@Injectable({
  providedIn: "root"
})
export class SpotifyService {
  token: string= null;
  favsSongs: any[]=[];
  constructor(private http: HttpClient) {
  }

  getQuery(query: string) {
    const url = `https://api.spotify.com/v1/${query}`;
    this.token = localStorage.getItem('auth');
    
    const headers = new HttpHeaders({
      Authorization:`Bearer ${this.token}`
    });

    return this.http.get(url, { headers });
  }


  getArtistas(termino: string) {
    return this.getQuery(`search?q=${termino}&type=artist&limit=15`).pipe(
      map(data => data["artists"])
    );
  }
  
  FavState(favSong: string){
    this.favsSongs = JSON.parse(localStorage.getItem('ids'));
    return !!this.favsSongs.find(song => song === favSong);   
  }

  getArtista(id: string) {
    return this.getQuery(`artists/${id}`).pipe(
      map(data=> Artist.fromResponse(data))
    );
  }

  getAlbums(id: string) {
    return this.getQuery(`artists/${id}/albums?market=ES&limit=20`).pipe(
      map(data => data["items"])
    );
  }
  getTracks(id: string) {
      return this.getQuery(`albums/${id}/tracks`).pipe(
        map(data => data["items"])
      );     
  }

  getTracksbyId(id: string) {
    return this.getQuery(`tracks/${id}`);   
    ;     
}

  getAlbum(id: string){
    return this.getQuery(`albums/${id}`);
      ;
  }

  auth() {
    this.token = localStorage.getItem('auth');
    const urlBase = 'https://accounts.spotify.com/authorize';
    const clientId = 'e12a6e854880471bba5715cbeff4fcc4';
    const scopes = encodeURIComponent('user-read-private user-read-email');
    const redirectUri = encodeURIComponent('http://localhost:4200/search');
    const url = `${urlBase}?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}&scope=${scopes}&show_dialog=true`;
    if (!this.token) {
      window.location.assign( url);
    }
  }
}
  class Artist {
    nombre: string;
    id: string;
    //album: Array<any>; hacer clase album
    imagenes: Array<any>;

    constructor(nombre: string = '',id: string = '',imagenes: Array<any>= []) {
      this.nombre = nombre;
      this.id = id;
      this.imagenes = imagenes;
    }

    static fromResponse(data:any) {
        if(!data){
            return new Artist;
          }

          return new Artist(data.name,data.id,data.images);

    }

  }
