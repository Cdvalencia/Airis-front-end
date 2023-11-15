import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalizeInitials'
})
export class CapitalizeInitialsPipe implements PipeTransform {

  transform(value: string): string {
    return value
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

}
