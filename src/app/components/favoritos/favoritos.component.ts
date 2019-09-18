import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
})
export class FavoritosComponent implements OnInit {

  tracksId=[];
  tracksFavorites: any[]=[];
  tracksIds= JSON.parse(localStorage.getItem('ids'));

  constructor(private spotify: SpotifyService,private route: Router) { }  

  ngOnInit() {
   this.Getfavorites();   
  }

   Getfavorites(){     
    this.tracksId= JSON.parse(localStorage.getItem('ids'));    
    for(let id of this.tracksId){
      this.spotify.getTracksbyId( id )
      .subscribe( (data: any) => {
        this.tracksFavorites.push(data);      
                    });   // of(this.tracksId).pipe(concatMap(id => this.spotify.getTracksbyId(id.toString()))) ;
                  }
    }

    verAlbum( item: any ) {

      let albumId = item.id;
      this.route.navigate([ '/album', albumId  ]);
  
    }
    y
    checkFav(trackId: any){
      return this.spotify.FavState( trackId );  
                  }

    AddRemoveFav( trackId: any){
      if (this.spotify.FavState(trackId)){
        localStorage.removeItem('ids');
        for(var i=0; i < this.tracksIds.length; i++){
          if(this.tracksIds[i] === trackId) {
            this.tracksIds.splice(i,1);
          }
        }
        localStorage.setItem('ids', JSON.stringify(this.tracksIds));
        location.reload();
      }
      else {
        this.tracksIds.push(trackId);
        console.log(this.tracksIds);
        localStorage.setItem('ids', JSON.stringify(this.tracksIds));
      }
    }
  }


