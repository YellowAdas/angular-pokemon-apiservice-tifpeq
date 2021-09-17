import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { PokemonDetails } from '../pokemon-details.model';
import { PokemonListItem } from '../pokemon-list-item.model';

export interface ListWrapper<ListItem> {
  count: number;
  next: string;
  prev: string;
  results: ListItem[];
}

export type PokemonListResult = ListWrapper<PokemonListItem>;

@Injectable({ providedIn: 'root' })
export class PokemonApiService {
  constructor(private http: HttpClient) {}

  fetchList(limit: number, offset: number) {
    const params = new HttpParams({ fromObject: { limit, offset } });

    return this.http.get<PokemonListResult>(
      'https://pokeapi.co/api/v2/pokemon',
      { params }
    );
  }

  fetchDetails(name: string) {
    return this.http.get<PokemonDetails>(
      `https://pokeapi.co/api/v2/pokemon/${name}`
    );
  }

}
