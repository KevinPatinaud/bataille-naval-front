import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS, FormControl, Validator } from '@angular/forms';

@Directive({
    selector: '[validateEmail][ngModel]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => EmailValidatorDirective), multi: true }
    ]
})
export class EmailValidatorDirective implements Validator {
    validate(c: FormControl): { [key: string]: any } | null {
        const emailRegexp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if ( c.value === '' ) return { 'invalidEmail': false };
        return emailRegexp.test(c.value) ? null : { 'invalidEmail': true };
    }

    
}