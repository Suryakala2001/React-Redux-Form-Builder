export type FieldType =
  | 'text'
  | 'number'
  | 'textarea'
  | 'select'
  | 'radio'
  | 'checkbox'
  | 'date';

export type ValidatorRule =
  | { type: 'required' }
  | { type: 'minLength'; value: number }
  | { type: 'maxLength'; value: number }
  | { type: 'email' }
  | { type: 'password'; min?: number; requireNumber?: boolean };

export interface FieldOption { label: string; value: string }

export interface FieldSchema {
  id: string;
  type: FieldType;
  label: string;
  required?: boolean;
  defaultValue?: any;
  options?: FieldOption[]; // for select/radio/checkbox
  validators?: ValidatorRule[];
  derived?: {
    parents: string[]; // parent field ids
    expression: string; // simple expression in JS using parent ids as variables, e.g. `Math.floor((today - dob)/31557600000)`
  } | null;
}

export interface FormSchema {
  id: string;
  name: string;
  createdAt: string; // ISO date
  fields: FieldSchema[];
}
