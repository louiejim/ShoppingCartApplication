import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';
import { UserListComponent } from '../../modules/user-list/pages/user-list/user-list.component';

@Directive({
  selector: '[appIsDuplicateUsername]',
  providers: [{provide: NG_VALIDATORS, useExisting: IsDuplicateUsernameDirective, multi: true}]
})
export class IsDuplicateUsernameDirective implements Validator {
  @Input('appIsDuplicateUsername') userListComponent!: UserListComponent | string;

  constructor() { }

  validate(control: AbstractControl): ValidationErrors | null {
    if (control.value && typeof this.userListComponent !== 'string' && this.userListComponent.checkDuplicateUsername(control.value)) {
      return { duplicateUsername: true };
    }
    return null;
  }
}