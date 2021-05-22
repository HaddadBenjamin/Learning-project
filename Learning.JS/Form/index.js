const getAllErrors = () => Object.entries(errors)
    .map(error => error[1])
    .filter(error => error !== null)
    .map(error => `- ${error}`)
    .join('\n')

const refreshErrorSummary = () => elements.errorSummary.innerText = getAllErrors()

const validateField = (validateFieldCallback) => { validateFieldCallback(); refreshErrorSummary() }

const getFieldValue = (event) => event?.target?.value ?? event?.checked

let values = { name : null, email : null, date : null, enable : null, phone : null, age : null, country : null }
let errors = { name : null, email : null, date : null, enable : null, phone : null, age : null, country : null }
let elements =
{
    errorSummary : document.querySelector('.form-error-summary'),
  
    name : document.querySelector('.form-input-name'),
    email : document.querySelector('.form-input-email'),
    date : document.querySelector('.form-input-date'),
    enable : document.querySelector('.form-input-enable'),
    phone : document.querySelector('.form-input-phone'),
    age : document.querySelector('.form-input-age'),
    country : document.querySelector('.form-input-country'),

    submit : document.querySelector('.form-submit-button'),
}

const validate =
{
    name : (value) => elements.name.nextElementSibling.innerText = errors.name = !value || value.length === 0 ? "Le nom est requis" : null,
   
    email : (value) =>
    {
        const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        
        elements.email.nextElementSibling.innerText = errors.email = 
            !value || value.length === 0 ? "Email requis" :
            !emailRegex.test(value) ? 'Email est invalide' : null
    },
   
    phone : (value) =>
    {
        const phoneRegex = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
        
        elements.phone.nextElementSibling.innerText = errors.phone = 
            !value || value.length === 0 ? "Numéro de téléphone requis" :
            !phoneRegex.test(value) ? 'Le numéro de téléphone est invalide' : null
    },

    age : (value) => elements.age.nextElementSibling.innerText = errors.age = 
        !value || value.length === 0 ? "Sélectionner votre âge" :
        value < 18 ? "Interdit au mineur" :
        value > 60 ? "Interdit au sénior" : null,
  
    enable : (value) => elements.enable.nextElementSibling.innerText = errors.enable = value === null ? 'Veuillez cocher la case' : null,
    
    date : (value) => elements.date.nextElementSibling.innerText = errors.date = value === null ? 'Veuillez sélectionner une date' : null,
   
    country : (value) => elements.country.nextElementSibling.innerText = errors.country = value === null ? 'Veuillez sélectionner une date' : null,

    all : () =>
    {
        validate.name(values.name)
        validate.email(values.email)
        validate.phone(values.phone)
        validate.age(values.age)
        validate.enable(values.enable)
        validate.date(values.date)
        validate.country(values.country)
    }
}

const handlers =
{
    name : (event) => validateField(() => validate.name(values.name = getFieldValue(event))),
    email : (event) => validateField(() => validate.email(values.email = getFieldValue(event))),
    phone : (event) => validateField(() => validate.phone(values.phone = getFieldValue(event))),
    age : (event) => validateField(() => validate.age(values.age = getFieldValue(event))),
    enable : (event) => validateField(() => validate.enable(values.enable = getFieldValue(event))),
    date : (event) => validateField(() => validate.date(values.date = getFieldValue(event))),
    country : (event) => validateField(() => validate.country(values.country = getFieldValue(event))),

    submit : (event) =>
    {
        event.preventDefault()

        validateField(() => validate.all())

        alert(`Errors :\n${getAllErrors()}\n\nValues :\n${JSON.stringify(values)}`)
    }
}

elements.name.addEventListener('input', handlers.name)
elements.email.addEventListener('input', handlers.email)
elements.phone.addEventListener('input', handlers.phone)
elements.age.addEventListener('input', handlers.age)
elements.date.addEventListener('change', handlers.date)
elements.enable.addEventListener('change', handlers.enable)
elements.country.addEventListener('change', handlers.country)

elements.submit.addEventListener('click', handlers.submit)