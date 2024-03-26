import * as Yup from 'yup';

export const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  lastName: Yup.string().required('Last name is required'),
  age: Yup.number()
    .required('Age is required')
    .typeError('Age must be a number')
    .positive('Age must be greater than zero')
    .max(120, 'Age must be less than or equal to 120 years'),
  birthdayDate: Yup.string().required('Your birthday is required'),
});
