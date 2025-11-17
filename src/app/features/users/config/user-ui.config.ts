import { Validators } from "@angular/forms";

export const ROLES_OPTIONS = [
  { label: 'Admin', value: 'Admin' },
  { label: 'Manager', value: 'Manager' },
  { label: 'User', value: 'User' }
];

export const STATUS_OPTIONS = [
  { label: 'Active', value: 'Active' },
  { label: 'Inactive', value: 'Inactive' }
];

export const USER_FORM_CONFIG = [
  { type: 'text', name: 'name', label: 'Name', placeholder: 'Enter name',  required: true },
  { type: 'text', name: 'email', label: 'Email', placeholder: 'Enter email',  required: true  },
  {
    type: 'dropdown',
    name: 'role',
    label: 'Role',
    placeholder: 'Select role',
    options: ROLES_OPTIONS,
    required: true 
  },
  {
    type: 'dropdown',
    name: 'status',
    label: 'Status',
    placeholder: 'Select status',
    options: STATUS_OPTIONS,
    required: true 
  }
];

export const USER_FORM_GROUP_DEF = {
  id: [null],
  name: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z0-9\s]+$/)]],
  email: ['', [Validators.required, Validators.email, Validators.pattern(/^.+@[a-zA-Z0-9]+\.com$/i)]],
  role: ['', Validators.required],
  status: ['', Validators.required]
};



