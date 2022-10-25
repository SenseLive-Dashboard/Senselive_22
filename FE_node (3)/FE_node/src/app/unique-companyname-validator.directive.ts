import { Directive } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NameService } from './name.service';

export function UniqueCompanynameValidator(nameService:NameService):AsyncValidatorFn{
  return(c:AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    return nameService.getDataByCompanyname(c.value).pipe(
      map(Company => {
        return Company && Company.length > 0 ? { 'uniqueCompanyname': true} : null;
       })
    );
  };
}

@Directive({
  selector: '[UniqueCompanyname]'
})
export class UniqueCompanynameValidatorDirective {

  constructor() { }

}
