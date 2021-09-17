import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { MatIconModule } from '@angular/material/icon';
import { AppComponent } from './app.component';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import {
  ListReducer,
  pokemonListFeatureKey,
} from './pokemon-list/store/listReducers';
import { ListEffects } from './pokemon-list/store/listEffects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { PokemonTypeToColorPipe } from './pokemon-type-to-color.pipe';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

const appRoutes: Routes = [
  { path: '', component: PokemonListComponent },
  { path: 'pokemonDetail/:name', component: PokemonDetailComponent },
];

const firebaseConfig = {
  apiKey: 'AIzaSyCrmCr3Hyo9Nmp9f7cf_ydzKBwl-v5rCIw',
  authDomain: 'pokemonapibackend.firebaseapp.com',
  databaseURL:
    'https://pokemonapibackend-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'pokemonapibackend',
  storageBucket: 'pokemonapibackend.appspot.com',
  messagingSenderId: '311776143377',
  appId: '1:311776143377:web:4cc40d74a3dd6693e769b0',
  measurementId: 'G-ZQ1MDFX2SN',
};

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    MatPaginatorModule,
    MatIconModule,
    NoopAnimationsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule.enablePersistence(),
    StoreModule.forRoot({ [pokemonListFeatureKey]: ListReducer }, {}),
    EffectsModule.forRoot([ListEffects]),
    StoreDevtoolsModule.instrument({}),
  ],
  declarations: [
    AppComponent,
    PokemonListComponent,
    PokemonDetailComponent,
    PokemonTypeToColorPipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
