import { Directive } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CardService} from './card.service';

export function UniqueparaValidator(cardService:CardService):AsyncValidatorFn{
  return(c:AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    return cardService.get_para(c.value).pipe(
      map(Parameter => {
        return Parameter && Parameter.length > 0 ? { 'uniqueparaname': true} : null;
       
       })
    );
  }; 
  
}

@Directive({
  selector: '[appParameterValidator]'
})
export class ParameterValidatorDirective {

  constructor() { }

}
