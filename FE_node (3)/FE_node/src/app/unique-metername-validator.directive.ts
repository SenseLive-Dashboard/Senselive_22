import { Directive } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MeterregService } from './meterreg.service';


export function UniqueMeternameValidator(meterreg:MeterregService):AsyncValidatorFn{
  return(c:AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    return meterreg.getMeterByMetername(c.value).pipe(
      map(Meter => {
        return Meter && Meter.length > 0 ? { 'uniqueMetername': true} : null;
       })
    );
  };
}



@Directive({
  selector: '[UniqueMetername]',
})
export class UniqueMeternameValidatorDirective {

  constructor() { }

}
