import {
  pokemonListFeatureKey,
  State
} from '../pokemon-list/store/listReducers';

export interface AppState {
  [pokemonListFeatureKey]: State;
}
