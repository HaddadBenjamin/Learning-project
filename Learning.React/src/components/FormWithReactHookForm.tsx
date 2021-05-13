import * as yup from 'yup'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

type FormValues =
{
  name : string
  email : string
  phone : string
  enable : boolean
  age : number
  startDate : Date
  country : string
}

const validationSchema = yup.object().shape({
  name : yup.string().required('Le nom est requis'),
  email : yup.string().email('L\'email n\'est pas vaide'),
  phone : yup.string().matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, 'Le numéro de téléphone n\'est pas valide'),
  enable : yup.boolean().typeError('Doit-être vrai ou faux').required('Ce champs est requis'),
  age : yup.number().typeError('Doit-être un nombre').positive('Un âge négatif ? vraiment ?').min(18, "Interdit au mineur").max(60, 'Interdit au sénior'),
  startDate : yup.date().typeError('Doit-être une date').required("Il nous faut une date !"),
  country : yup.string().required('La ville est requise').oneOf(['France', 'Angleterre', 'Allemagne'], 'Sélectionner un pays')
})
let numberOfRender = 0

const FormWithReactHookForm = () =>
{
  const { register, handleSubmit, reset, formState : { errors } } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
    defaultValues : { name : 'valeur par défault'}
  })
  
  return <>
    <h2>Formulaire avec React Hook Form et Yup</h2>
    {/* <div>Nombre de rendu : {++numberOfRender}</div> */}
    {Object.entries(errors).map(error => <div style={{'color' : 'red'}} key={error[0]}>{`- ${error[0]} : ${error[1]?.message}`}</div>)}
    <form onSubmit={handleSubmit(formValues => { alert(JSON.stringify(formValues)); /* reset(); */ } )}>
      Nom : <input {...register("name")}/>
      <span style={{'color' : 'red'}}>{errors.name?.message}</span>
      Email : <input {...register("email")}/>
      <span style={{'color' : 'red'}}>{errors.email?.message}</span>
      Téléphone : <input {...register("phone")}/>
      <span style={{'color' : 'red'}}>{errors.phone?.message}</span>
      
      Actif : <input type="checkbox" {...register("enable")}/>
      <span style={{'color' : 'red'}}>{errors.enable?.message}</span><br></br>

      Age : <input {...register("age", { valueAsNumber : true })}/>
      <span style={{'color' : 'red'}}>{errors.age?.message}</span>
      Date de début : <input type="date" {...register("startDate", { valueAsDate : true })}/>
      <span style={{'color' : 'red'}}>{errors.startDate?.message}</span>

      Ville : <select {...register("country")}>
        <option value="France">France</option>
        <option value="Angleterre">Angleterre</option>
        <option value="Allemagne">Allemagne</option>
      </select>
      <span style={{'color' : 'red'}}>{errors.country?.message}</span><br></br>
  
      <button>Envoyer</button>
    </form><br></br>
  </>
}

export default FormWithReactHookForm