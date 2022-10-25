import { Directive } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NameService } from './name.service';

export function UniqueEmailValidator(nameService:NameService):AsyncValidatorFn{
  return(c:AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    return nameService.getDataByEmail(c.value).pipe(
      map(Company => {
        return Company && Company.length > 0 ? { 'uniqueEmail': true} : null;
       })
    );
  };
}

@Directive({
  selector: '[UniqueEmail]'
})
export class UniqueEmailValidatorDirective {

  constructor() { }

}
