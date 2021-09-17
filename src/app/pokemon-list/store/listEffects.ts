import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { getList, loadList, errorList, setPagination } from './listActions';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { forkJoin, of } from 'rxjs';
import { PokemonApiService } from './../../PokemonApiService/pokemon-api.service';
import { Store } from '@ngrx/store';
import { selectPokemonListPagination } from './listReducers';
@Injectable()
export class ListEffects {
  constructor(
    private store: Store,
    private actions$: Actions,
    private pokemonApiService: PokemonApiService
  ) {}

  loadList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getList),
      concatLatestFrom(action =>
        this.store.select(selectPokemonListPagination)
      ),
      tap(action => {
        console.log(action);
      }),
      switchMap(([action, pagination]) =>
        this.pokemonApiService
          .fetchList(
            pagination.limit,
            pagination.limit * pagination.currentPage
          )
          .pipe(
            switchMap(result => {
              const resultRequests = result.results.map( pokemon => this.pokemonApiService.fetchDetails(pokemon.name));
              return forkJoin(resultRequests).pipe(
                map(details => 
                  loadList({
                    pokemonListItems: details,
                    totalCount: result.count
                  })
                  )
              )
            }),
            catchError(error => of(errorList({ message: error })))
          )
      )
    )
  );

  loadListOnPaginationChange$ = createEffect(() =>
    this.actions$.pipe(
      ofType(setPagination),
      map(() => getList())
    )
  );
}
