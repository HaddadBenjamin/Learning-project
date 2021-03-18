import * as Yup from 'yup'
import * as React from 'react'
import { withFormik, FormikProps, FormikErrors, Form, Field } from 'formik'

// Le rendu formulaire.
interface FormValues { email: string; password: string }
const FormWithFormik = ({ touched, errors, isSubmitting } : FormikProps<FormValues>) =>
{
  return <Form className="mb-4">
      <h2>Formulaire avec Formik et Yup</h2>

      <label htmlFor="email">Email</label>
      <Field type="email" name="email" className="ml-2"/>
      {touched.email && errors.email && <span className="ml-2 text-danger">{errors.email}</span>}

      <label htmlFor="password" className="ml-3">Password</label>
      <Field type="password" name="password" className="ml-2"/>
      {touched.password && errors.password && <span className="ml-2 text-danger">{errors.password}</span>}

      <button type="submit" disabled={isSubmitting} className="ml-3">Submit</button>
  </Form>
}

// La validation du formulaire, c'est également un HOC sur votre formulaire afin de séparer la logique et le rendu.
// const isValidEmail = (email : string) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)
// const isValidPassword = (password : string) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i.test(password)
interface Props { email?: string, password? : string }
const FormWithFormikAndYup = withFormik<Props, FormValues>(
{ 
  mapPropsToValues:  ({ email, password } : Props) => { return { email: email || '', password: '', }; },
  // Validation de schéma avec yup.
  validationSchema: Yup.object({
    password : Yup.string().min(8, 'Must be 8 characters or less').max(15, 'Must be 15 characters or less').required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
  }),

  handleSubmit: ({ email, password }: FormValues) => { }
  // Validation de schéma sans yup.
  // validate: ({ email, password }: FormValues) =>
  // {
  //   // Sans yup
  //   let errors: FormikErrors<FormValues> = {};
    
  //   if (!email)                           errors.email = 'Required'
  //   else if (!isValidEmail(email))        errors.email = 'Invalid email address'

  //   if (!password)                        errors.password = 'Required'
  //   else if (!isValidPassword(password))  errors.password = 'Invalid password'

  //   return errors;
  // },
  // Validation de shéma avec yup.
})(FormWithFormik);

export default FormWithFormikAndYup