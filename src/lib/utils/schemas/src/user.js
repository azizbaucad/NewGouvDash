import { object, ref, string } from 'yup';

export const userInfosEdit = object({
  firstName: string().min(2).required(),
  lastName: string().min(2).required(),
  email: string().email().required(),
  editProfile: string().trim(),
});

export const passwordEdit = object({
  password: string().min(8).required(),
  password_confirm: string()
    .oneOf([ref('password'), null], 'Passwords must match')
    .required(),
  submit: string().trim(),
});
