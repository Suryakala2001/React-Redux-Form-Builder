import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  Box,
  Grid,
  TextField,
  Button,
  MenuItem,
  Typography,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { FieldSchema, FieldType, FormSchema } from '../../types';
import FieldEditor from './FieldEditor';
import FieldList from './FieldList';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { formActions } from '../../store/formSlice';
import { saveFormSchema, getAllForms } from '../../utils/localStorage';

const fieldTypes: { value: FieldType; label: string }[] = [
  { value: 'text', label: 'Text' },
  { value: 'number', label: 'Number' },
  { value: 'textarea', label: 'Textarea' },
  { value: 'select', label: 'Select' },
  { value: 'radio', label: 'Radio' },
  { value: 'checkbox', label: 'Checkbox' },
  { value: 'date', label: 'Date' },
];

export default function CreateForm() {
  const dispatch = useDispatch();
  const current = useSelector((s: RootState) => s.form.currentForm);
  const [type, setType] = useState<FieldType>('text');
  const [editingField, setEditingField] = useState<FieldSchema | null>(null);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [formName, setFormName] = useState(current.name || 'Untitled');

  function handleAdd() {
    const fld: FieldSchema = {
      id: uuidv4(),
      type,
      label: 'New Field',
      required: false,
      defaultValue: '',
      options: type === 'select' || type === 'radio' || type === 'checkbox' ? [{ label: 'Option 1', value: 'opt1' }] : undefined,
      validators: [],
      derived: null,
    };
    dispatch(formActions.addField(fld));
  }

  function handleEdit(field: FieldSchema) {
    setEditingField(field);
  }

  function handleSaveField(updated: FieldSchema) {
    dispatch(formActions.updateField(updated));
    setEditingField(null);
  }

  function handleDelete(id: string) {
    dispatch(formActions.removeField(id));
  }

  function handleReorder(from: number, to: number) {
    dispatch(formActions.reorderFields({ from, to }));
  }

  function openSaveDialog() {
    setFormName
  }
}
