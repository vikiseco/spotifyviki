import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent  {
  tracks: any[];
  album: any = {};
  tracksIds= JSON.parse(localStorage.getItem('ids'));
  
  constructor( private router: ActivatedRoute, private spotify: SpotifyService ) {

    this.router.params.subscribe( params => {

      this.getTracks( params['id'] );
      this.getAlbum( params['id'] );

    });

   }
   
   
   getTracks( id: string ) {
    this.spotify.getTracks( id )
            .subscribe( (data: any) => {
              this.tracks = data;
                          });                          
  }

  getAlbum( id:string) {
    this.spotify.getAlbum( id )
    .subscribe( (data: any) => {
      this.album = data;
                  });                          
}
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
    }
    else {
      this.tracksIds.push(trackId);
      console.log(this.tracksIds);
      localStorage.setItem('ids', JSON.stringify(this.tracksIds));
    }
  }

 sortTable() {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("myTable");
    switching = true;
    // Set the sorting direction to ascending:
    dir = "asc";
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
      // Start by saying: no switching is done:
      switching = false;
      rows = table.rows;
      /* Loop through all table rows (except the
      first, which contains table headers): */
      for (i = 1; i < (rows.length - 1); i++) {
        // Start by saying there should be no switching:
        shouldSwitch = false;
        /* Get the two elements you want to compare,
        one from current row and one from the next: */
        x = rows[i].getElementsByTagName("TD")[2];
        y = rows[i + 1].getElementsByTagName("TD")[2];
        /* Check if the two rows should switch place,
        based on the direction, asc or desc: */
        if (dir == "asc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        } else if (dir == "desc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        /* If a switch has been marked, make the switch
        and mark that a switch has been done: */
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        // Each time a switch is done, increase this count by 1:
        switchcount ++;
      } else {
        /* If no switching has been done AND the direction is "asc",
        set the direction to "desc" and run the while loop again. */
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }


}
  


