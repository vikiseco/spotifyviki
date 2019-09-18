import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-tarjetas',
  templateUrl: './tarjetas.component.html',
  styleUrls: ['./tarjetas.component.css']
})
export class TarjetasComponent {

  @Input() items: [];

  constructor( private router: Router ) { }

  verArtista( item: any ) {
    let artistaId = item.id;
    this.router.navigate([ '/artist', artistaId  ]);
  }

}
