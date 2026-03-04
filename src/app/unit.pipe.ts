import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unit'
})
export class UnitPipe implements PipeTransform {

  transform(value:any,family:string): unknown {
    switch (family) {
      case ('Wears'):
      case ('Gadgets'):
      case ('Asthetics'):
        return `${value}/Piece`
      case ('Groceries'):
        return `${value}/Kg`
      case ('Groceries-leaf-flowers'):
        return `${value} (200g)`
      case ('Utensils'):
        return `${value}/Set`

      default:
        return 'default'
    }
  }

}
