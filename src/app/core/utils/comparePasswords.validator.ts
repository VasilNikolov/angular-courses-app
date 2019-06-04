import {AbstractControl} from '@angular/forms';

export function comparePasswordsValidator(control: AbstractControl) {
  const passwordFormControl: AbstractControl = control.parent && control.parent.get('password');
  const repeatPasswordFormControl: AbstractControl = control.parent && control.parent.get('repeatPassword');

  if (passwordFormControl && passwordFormControl.value && passwordFormControl.value === repeatPasswordFormControl.value) {
    return null;
  } else {
    return {invalidCompare: true};
  }
}
