import { act } from '@ngrx/effects/src/act';
import {
  createFeatureSelector,
  createReducer,
  on,
  createSelector
} from '@ngrx/store';
import { PokemonDetails } from '../../pokemon-details.model';
import { PokemonListItem } from '../../pokemon-list-item.model';
import { AppState } from '../../state/state';
import { errorList, loadList, setPagination } from './listActions';

export interface State {
  list: { pokemonList: PokemonDetails[]; error: string };
  pagination: {
    currentPage: number;
    limit: number;
    totalCount: number;
  };
}

export const initialState: State = {
  list: { pokemonList: [], error: '' },
  pagination: {
    currentPage: 0,
    limit: 5,
    totalCount: 0
  }
};

export const ListReducer = createReducer<State>(
  initialState,
  on(loadList, (state, action) => ({
    ...state,
    list: { pokemonList: action.pokemonListItems, error: '' },
    pagination: {
      ...state.pagination,
      totalCount: action.totalCount
    }
  })),
  on(errorList, (state, action) => ({
    ...state,
    list: { pokemonList: [], error: action.message }
  })),
  on(setPagination, (state, action) => ({
    ...state,
    pagination: {
      ...state.pagination,
      currentPage: action.currentPage,
      limit: action.limit
    }
  }))
);

export const pokemonListFeatureKey = 'PokemonList';

export const selectItems = (state: State) => state.list.pokemonList;

export const selectError = (state: State) => state.list.error;

export const selectPokemonListState = createFeatureSelector<AppState, State>(
  pokemonListFeatureKey
);

export const selectPokemonListItems = createSelector(
  selectPokemonListState,
  selectItems
);

export const selectPokemonListPagination = createSelector(
  selectPokemonListState,
  state => state.pagination
);
