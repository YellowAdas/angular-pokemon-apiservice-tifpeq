export interface PokemonDetails {
  name: string;
  height: number;
  id: number;
  abilities: PokemonDetailsAbility[];
  sprites: {
    front_default: string;
    back_default: string;
  };
  types: PokemonType[];
}

export interface PokemonDetailsAbility {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

export interface PokemonType {
  type: {
    name:string;
    url:string;
  };
  slot: number;
}