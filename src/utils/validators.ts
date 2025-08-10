import { ValidatorRule } from '../types';

export function runValidators(value: any, validators: ValidatorRule[] | undefined) {
  const errors: string[] = [];
  if (!validators || validators.length === 0) return errors;

  validators.forEach((v) => {
    switch (v.type) {
      case 'required':
        if (value === undefined || value === null || value === '') errors.push('This field is required');
        break;
      case 'minLength':
        if (typeof value === 'string' && value.length < v.value) errors.push(`Minimum length is ${v.value}`);
        break;
      case 'maxLength':
        if (typeof value === 'string' && value.length > v.value) errors.push(`Maximum length is ${v.value}`);
        break;
        case 'email':
        if (typeof value === 'string') {
          const ok = /^\S+@\S+\.\S+$/.test(value);
          if (!ok) errors.push('Invalid email address');
        }
        break;
      case 'password':
        if (typeof value === 'string') {
          if (v.min && value.length < v.min) errors.push(`Password must be at least ${v.min} chars`);
          if (v.requireNumber && !/\d/.test(value)) errors.push('Password must contain a number');
        }
        break;
    }
  });

  return errors;
}
