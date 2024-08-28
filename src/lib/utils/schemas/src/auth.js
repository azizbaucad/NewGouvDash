import { object, ref, string } from 'yup';

export const authentication = object({
  identifier: string().trim().required(),
  password: string().trim().required(),
  authentication: string().trim(),
});

export const registration = object({
  email: string().email().required(),
  password: string()
    .trim()
    .min(8)
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/,
      'password must contain at least 1 lower case 1 uppercase a symbol and a number'
    )
    .required(),
  password_confirm: string()
    .oneOf([ref('password'), null], 'Passwords must match')
    .required(),
  registration: string().trim(),
});

export const passwordRecovery = object({
  email: string().email().required(),
});
