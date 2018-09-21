import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the SaldoTokenPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'saldoTokenPipe',
})
export class SaldoTokenPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string) {
    
      if((value!=undefined)&&(value!="")){
        return value.replace(/\D/g, "");
      }
      return value;
  }
}
