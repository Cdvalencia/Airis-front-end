import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'camelCase'
})
export class CamelCasePipe implements PipeTransform {
  transform(value: string): string {
    // Si el texto es "id", lo devolvemos en mayúsculas
    if (value.toLowerCase() === 'id') {
      return value.toUpperCase();
    }

    // Si no, convertimos la primera letra en mayúscula y el resto en minúsculas
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }

}
