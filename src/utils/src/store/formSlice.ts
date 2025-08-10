import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FieldSchema, FormSchema } from '../types';
import { getAllForms } from '../utils/localStorage';

interface BuilderState {
  currentForm: Omit<FormSchema, 'id' | 'createdAt'> & { id?: string };
  savedForms: FormSchema[];
}

const initialState: BuilderState = {
  currentForm: { id: undefined, name: 'Untitled', fields: [] },
  savedForms: getAllForms(),
};

const slice = createSlice({
  name: 'formBuilder',
  initialState,
  reducers: {
    setFormName(state, action: PayloadAction<string>) {
      state.currentForm.name = action.payload;
    },
    addField(state, action: PayloadAction<FieldSchema>) {
      state.currentForm.fields.push(action.payload);
    },
    updateField(state, action: PayloadAction<FieldSchema>) {
      const idx = state.currentForm.fields.findIndex((f) => f.id === action.payload.id);
      if (idx >= 0) state.currentForm.fields[idx] = action.payload;
    },
    removeField(state, action: PayloadAction<string>) {
      state.currentForm.fields = state.currentForm.fields.filter((f) => f.id !== action.payload);
    },
    reorderFields(state, action: PayloadAction<{ from: number; to: number }>) {
      const { from, to } = action.payload;
      const arr = state.currentForm.fields;
      const [moved] = arr.splice(from, 1);
      arr.splice(to, 0, moved);
    },
    setCurrentForm(state, action: PayloadAction<FormSchema>) {
      state.currentForm = { ...action.payload };
    },
    setSavedForms(state, action: PayloadAction<FormSchema[]>) {
      state.savedForms = action.payload;
    },
    clearCurrentForm(state) {
      state.currentForm = { id: undefined, name: 'Untitled', fields: [] };
    },
  },
});

export const formActions = slice.actions;
export default slice.reducer;
