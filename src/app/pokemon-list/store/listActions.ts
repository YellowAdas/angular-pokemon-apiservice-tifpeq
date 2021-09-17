import { createAction, props } from '@ngrx/store';
import { PokemonDetails } from '../../pokemon-details.model';

export const setPagination = createAction(
  '[fetch-list] set list pagination',
  props<{ limit: number; currentPage: number }>()
);

export const getList = createAction('[fetch-list] get list');

export const loadList = createAction(
  '[fetch-list] load list',
  props<{ pokemonListItems: PokemonDetails[], totalCount: number }>()
);

export const errorList = createAction(
  '[fetch-list] load list error',
  props<{ message: string }>()
);
