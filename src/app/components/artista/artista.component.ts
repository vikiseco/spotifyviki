import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styles: []
})
export class ArtistaComponent {

  artista: any = {};
  albums: any[];

  constructor(private router: ActivatedRoute, private route: Router,
              private spotify: SpotifyService ) {


    this.router.params.subscribe( params => {

      this.getArtista( params['id'] );
      this.getAlbums( params['id'] );

    });

  }

  getArtista( id: string ) {
    this.spotify.getArtista( id )
          .subscribe( artista => {
            console.log(artista);
            this.artista = artista;
          });
  }

  getAlbums( id: string ) {
    this.spotify.getAlbums( id )
            .subscribe( (data: any) => {
              this.albums = data;
                          });                          
  }

  verAlbum( item: any ) {

    let albumId = item.id;
    this.route.navigate([ '/album', albumId  ]);

  }
}
