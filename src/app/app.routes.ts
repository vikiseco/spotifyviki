import { Routes } from '@angular/router';
import { SearchComponent } from './components/search/search.component';
import { ArtistaComponent } from './components/artista/artista.component';
import { AlbumComponent} from './components/album/album.component';



export const ROUTES: Routes = [
    { path: '', pathMatch: 'full', redirectTo: '/search' },
    { path: 'search', component: SearchComponent },
    { path: 'artist/:id', component: ArtistaComponent },
    { path: 'album/:id', component: AlbumComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'search' }
];

