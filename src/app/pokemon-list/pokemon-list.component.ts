import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator/paginator';
import { Subject, switchMap, Observable, tap } from 'rxjs';

import {
  PokemonApiService,
  PokemonListResult
} from '../PokemonApiService/pokemon-api.service';
import { PokemonListItem } from '../pokemon-list-item.model';
import { Store, select } from '@ngrx/store';
import { getList, setPagination } from './store/listActions';
import {
  selectItems,
  selectPokemonListItems,
  selectPokemonListPagination
} from './store/listReducers';
import { PokemonDetails } from '../pokemon-details.model';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {
  items$: Observable<PokemonDetails[]> = this.store.pipe(
    select(selectPokemonListItems)
  );

  pagination$ = this.store.pipe(select(selectPokemonListPagination));
  favoritesPokemons = new Set<number>();

  constructor(
    private pokemonApiService: PokemonApiService,
    private store: Store<{}>
  ) {}

  totalCount: number;
  pageSize: number = 20;
  currentPage = 0;

  pokemonListItemFetchRequest$ = new Subject<{
    limit: number;
    offset: number;
  }>();

  pokemonListResult$: Observable<
    PokemonListResult
  > = this.pokemonListItemFetchRequest$.pipe(
    switchMap(fetchRequest => {
      return this.pokemonApiService.fetchList(
        fetchRequest.limit,
        fetchRequest.offset
      );
    })
  );
  pokemonListItem: PokemonListItem[] = [];

  ngOnInit() {
    this.store.dispatch(getList());
    console.log('ng on init list');

    this.pokemonListResult$.subscribe(responseData => {
      this.pokemonListItem = responseData.results;
      console.log(responseData);
      this.totalCount = responseData.count;
    });
  }

  onFetch() {
    const offset = this.currentPage * this.pageSize;
    this.pokemonListItemFetchRequest$.next({
      offset,
      limit: this.pageSize
    });
  }

  onPageChange(event: PageEvent) {
    this.store.dispatch(
      setPagination({ currentPage: event.pageIndex, limit: event.pageSize })
    );
  }

  onFetchtest() {
    const offset = this.currentPage * this.pageSize;
    this.pokemonListItemFetchRequest$.next({
      offset,
      limit: this.pageSize
    });
  }

  // już tłumaczę - tutaj oczekujesz stringa  - type name, ale zapomniałeś że tam jest jeszcze type po drodze czyli zamiast item.types.0.name trzeba było item.types[0].type.name - zauważ też że dałem [0]. zamiast .0. bo tak się przechodzi do pierwszego (zerowego indexu) elementu tablicy
  // zadanie przerob funkcje setColorByType na pipe i poczytaj czemu są lepsze - pure function / mnemonification
  //https://angular.io/guide/pipes
  //https://indepth.dev/posts/1061/the-essential-difference-between-pure-and-impure-pipes-in-angular-and-why-that-matters
  //https://www.youtube.com/watch?v=I6ZvpdRM1eQ

  onFavClick(id: number) {
    if (!this.favoritesPokemons.has(id)) {
      this.favoritesPokemons.add(id);
      localStorage.setItem('Favorites',JSON.stringify([...this.favoritesPokemons]));
    } else {
      this.favoritesPokemons.delete(id);
    }

  }

  checkSet() {
    // console.log([...this.favoritesPokemons]);
    console.log(JSON.parse(localStorage.getItem('Favorites')));
  }
}
