let elements =
{
    name : document.querySelector('.name'),
    email : document.querySelector('.email'),
    date : document.querySelector('.date'),
    enable : document.querySelector('.date'),
    phone : document.querySelector('.phone'),
    age : document.querySelector('.age'),
    country : document.querySelector('.country'),

    nameError : document.querySelector('.name').nextElementSibling,
    emailError : document.querySelector('.email').nextElementSibling,
    dateError : document.querySelector('.date').nextElementSibling,
    enableError : document.querySelector('.date').nextElementSibling,
    phoneError : document.querySelector('.phone').nextElementSibling,
    ageError : document.querySelector('.age').nextElementSibling,
    countryError : document.querySelector('.country').nextElementSibling,

    errorSummary : document.querySelector('.error-summary'),
    submit : document.querySelector('.submit'),
}

let errors =
{
    name : null,
    email : null,
    date : null,
    enable : null,
    phone : null,
    age : null,
    country : null
}

let values =
{
    name : null,
    email : null,
    date : null,
    enable : null,
    phone : null,
    age : null,
    country : elements.country.value
}

const refreshErrorSummary = () =>
    elements.errorSummary.innerText = Object.entries(errors)
        .map(error => error[1] ? `- ${error[1]}` : '')
        .filter(error => error !== '')
        .join('\n')

const nameHandler = (event) =>
{
    const value = values.name = event.target.value

    elements.nameError.innerText = errors.name = !value || value.length === 0 ? "Le nom est requis" : null

    refreshErrorSummary()
}

const emailHandler = (event) =>
{
    const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const value = values.email = event.target.value

    elements.emailError.innerText = errors.email = 
        !value || value.length === 0 ? "Email requis" : null ||
         emailRegex.test(value) ? null : 'Email est invalide'

    refreshErrorSummary()
}

const phoneHandler = (event) =>
{
    const phoneRegex = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    const value = values.phone = event.target.value

    elements.phoneError.innerText = errors.phone = 
        !value || value.length === 0 ? "Numéro de téléphone requis" : null ||
        phoneRegex.test(value) ? null : 'Le numéro de téléphone est invalide'

    refreshErrorSummary()
}

const ageHandler = (event) =>
{
    const value = values.age = event.target.value

    elements.ageError.innerText = errors.age = 
        !value || value.length === 0 ? "Sélectionner votre âge" : null ||
        value < 18 ? "Interdit au mineur" : null ||
        value > 60 ? "Interdit au sénior" : null

    refreshErrorSummary()
}

const enableHandler = (event) => values.enable = event.checked
const dateHandler = (event) => values.date = event.target.value
const countryHandler = (event) => values.country = event.target.value

const submitHandler = (event) => 
{
    event.preventDefault()
    alert(JSON.stringify(values))
}

elements.name.addEventListener('input', nameHandler)
elements.email.addEventListener('input', emailHandler)
elements.phone.addEventListener('input', phoneHandler)
elements.age.addEventListener('input', ageHandler)
elements.date.addEventListener('change', dateHandler)
elements.enable.addEventListener('change', enableHandler)
elements.country.addEventListener('change', countryHandler)
elements.submit.addEventListener('click', submitHandler)
// input[text|password|number|date] = event.target.value, event 'input'
// input['checkbox'] = event.checked, event 'change'
// select (dropdown) = event.target.value, event 'change'

// Mettre les values dans un objet et les afficher au submit