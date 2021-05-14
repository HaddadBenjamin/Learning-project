import * as yup from 'yup'
import * as React from 'react'
import { withFormik, FormikProps, FormikErrors, Form, Field, ErrorMessage } from 'formik'

// Le rendu formulaire.
interface FormValues { email: string; password: string }
const FormWithFormik = ({ touched, errors, isSubmitting } : FormikProps<FormValues>) =>
{
  return <Form className="mb-4">
      <h2>Formulaire avec Formik et Yup</h2>
      Liste des erreurs : {Object.entries(errors).map(error => <div style={{'color' : 'red'}} key={error[0]}>{`- ${error[0]} : ${error[1]}`}</div>)}

      <label htmlFor="name">Name</label>
      <Field type="text" name="name" className="ml-2"/>
      <ErrorMessage name="name" component="span" className="ml-2 text-danger" />
      
      <label htmlFor="email">Email</label>
      <Field type="email" name="email" className="ml-2"/>
      <ErrorMessage name="email" component="span" className="ml-2 text-danger" />
      {/* {touched.email && errors.email && <span >{errors.email}</span>} */}

      <label htmlFor="password" className="ml-3">Password</label>
      <Field type="password" name="password" className="ml-2"/>
      <ErrorMessage name="password" component="span" className="ml-2 text-danger" />
      {/* {touched.password && errors.password && <span className="ml-2 text-danger">{errors.password}</span>} */}

      <label htmlFor="phone">Phone</label>
      <Field type="text" name="phone" className="ml-2"/>
      <ErrorMessage name="phone" component="span" className="ml-2 text-danger" />

      <label htmlFor="enable">enable</label>
      <Field type="checkbox" name="enable" className="ml-2"/>
      <ErrorMessage name="enable" component="span" className="ml-2 text-danger" />

      <label htmlFor="age">Age</label>
      <Field type="number" name="age" className="ml-2"/>
      <ErrorMessage name="age" component="span" className="ml-2 text-danger" />

      <label htmlFor="age">Start Date</label>
      <Field type="date" name="startDate" className="ml-2"/>
      <ErrorMessage name="startDate" component="span" className="ml-2 text-danger" />

      <label htmlFor="age">Country</label>
      <Field as="select" name="country">
        <option value="France">France</option>
        <option value="Angleterre">Angleterre</option>
        <option value="Allemagne">Allemagne</option>
      </Field>
      <ErrorMessage name="country" component="span" className="ml-2 text-danger" />

      <button type="submit" disabled={isSubmitting} className="ml-3">Envoyer</button>
  </Form>
}

// La validation du formulaire, c'est également un HOC sur votre formulaire afin de séparer la logique et le rendu.
// const isValidEmail = (email : string) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)
// const isValidPassword = (password : string) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i.test(password)
const validationSchema = yup.object().shape({
  password : yup.string().min(8, 'Pas assez de charactères').max(15, 'Trop de charactères').required('Le MDP est requis'),
  name : yup.string().required('Le nom est requis'),
  email : yup.string().email('L\'email n\'est pas vaide'),
  phone : yup.string().matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, 'Le numéro de téléphone n\'est pas valide'),
  enable : yup.boolean().typeError('Doit-être vrai ou faux').required('Ce champs est requis'),
  age : yup.number().typeError('Doit-être un nombre').positive('Un âge négatif ? vraiment ?').min(18, "Interdit au mineur").max(60, 'Interdit au sénior'),
  startDate : yup.date().typeError('Doit-être une date').required("Il nous faut une date !"),
  country : yup.string().required('La ville est requise').oneOf(['France', 'Angleterre', 'Allemagne'], 'Sélectionner un pays')
})
interface Props { email?: string, password? : string, name : string, phone : string, enable : boolean, age : number, startDate : Date, country : string }
const FormWithFormikAndYup = withFormik<Props, FormValues>(
{ 
  // Les valeurs par défaults du formulaire
  mapPropsToValues:  ({ email, password, name, phone, enable, age, startDate, country } : Props) => { return { email: email || '', password: '', }; },
  // Validation de schéma avec yup.
  validationSchema: validationSchema,
  handleSubmit: (formValues : FormValues) => { alert(JSON.stringify(formValues)) }
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