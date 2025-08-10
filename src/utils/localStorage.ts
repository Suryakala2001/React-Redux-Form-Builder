import { FormSchema } from '../types';

const KEY = 'form_builder_forms_v1';

export function saveFormSchema(schema: FormSchema) {
  const all = getAllForms();
  all.push(schema);
  localStorage.setItem(KEY, JSON.stringify(all));
}

export function getAllForms(): FormSchema[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    return JSON.parse(raw) as FormSchema[];
  } catch (e) {
    console.error('failed to read forms', e);
    return [];
  }
}

export function getFormById(id: string): FormSchema | undefined {
  return getAllForms().find((f) => f.id === id);
}
