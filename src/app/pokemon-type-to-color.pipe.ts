import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pokemonTypeToColor'
})
export class PokemonTypeToColorPipe implements PipeTransform {
  transform(types: { type: { name: string } }[]): any {
    const typeNames: string[] = types.map(el => el.type.name);
    if (typeNames.length == 0) {
      return 'gray';
    }
    const partSize = 100 / typeNames.length;

    const colorsToUse = typeNames.map(typeName => this.typeToColor(typeName));

    const gradientParts = [];

    for (let part = 0; part < typeNames.length; part++) {
      gradientParts.push(`${colorsToUse[part]} ${partSize * part}%`);
      gradientParts.push(`${colorsToUse[part]} ${partSize * (part + 1)}%`);
    }

    const gradient = `linear-gradient(180deg, ${gradientParts.join(', ')})`;
    return gradient;
  }

  typeToColor(typeName: string) {
    switch (typeName) {
      case 'grass':
        // set color to green
        return 'green';
      case 'fire':
        // set color to red
        return 'red';
      case 'water':
        // set color to blue
        return 'blue';
      default:
        // set color to gray
        return 'gray';
    }
  }
}
