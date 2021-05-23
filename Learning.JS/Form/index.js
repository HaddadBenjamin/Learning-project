const getAllErrors = () => Object.entries(errors)
    .map(error => error[1])
    .filter(error => error !== null)
    .map(error => `- ${error}`)
    .join('\n')

const refreshErrorSummaryText = () => elements.errorSummary.innerText = getAllErrors()

const refreshErrorSummary = (validateFieldCallback) => { validateFieldCallback(); refreshErrorSummaryText() }

const getFieldValue = (event) => event?.target?.value ?? event?.checked

const refreshInputStyle = (element, error) => 
{
    element.style.borderColor = error ? 'red' : 'rgba(248, 240, 240, 0.281)'

    element.nextElementSibling.nextElementSibling.src = error ? "images/invalid.png" : ""//images/valid.png"
}

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
    name : (value) => 
    {
        elements.name.nextElementSibling.innerText = errors.name = !value || value.length === 0 ? "Name is required" : null

        refreshInputStyle(elements.name, errors.name)
    },
   
    email : (value) =>
    {
        const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        
        elements.email.nextElementSibling.innerText = errors.email = 
            !value || value.length === 0 ? "Email is required" :
            !emailRegex.test(value) ? 'Email is invalid' : null

        refreshInputStyle(elements.email, errors.email)
    },
   
    phone : (value) =>
    {
        const phoneRegex = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
        
        elements.phone.nextElementSibling.innerText = errors.phone = 
            !value || value.length === 0 ? "Phone is required" :
            !phoneRegex.test(value) ? 'Phone is invalid' : null
        
        refreshInputStyle(elements.phone, errors.phone)
    },

    age : (value) =>
    {
        elements.age.nextElementSibling.innerText = errors.age = 
            !value || value.length === 0 ? "Select your age" :
            value < 18 ? "Prohibited minors" :
            value > 60 ? "Prohibited seniors" : null

        refreshInputStyle(elements.age, errors.age)
    },

    enable : (value) =>
    {
        elements.enable.nextElementSibling.innerText = errors.enable = value === null ? 'Please tick the box' : null,
       
        refreshInputStyle(elements.enable, errors.enable)
    },
    
    date : (value) =>
    {
        elements.date.nextElementSibling.innerText = errors.date = value === null ? 'Select a date' : null

        refreshInputStyle(elements.date, errors.date)
    }, 
   
    country : (value) =>
    {
        elements.country.nextElementSibling.innerText = errors.country = value === null ? 'Select a country' : null
        
        refreshInputStyle(elements.country, errors.country)
    }, 

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
    name : (event) => refreshErrorSummary(() => validate.name(values.name = getFieldValue(event))),
    email : (event) => refreshErrorSummary(() => validate.email(values.email = getFieldValue(event))),
    phone : (event) => refreshErrorSummary(() => validate.phone(values.phone = getFieldValue(event))),
    age : (event) => refreshErrorSummary(() => validate.age(values.age = getFieldValue(event))),
    enable : (event) => refreshErrorSummary(() => validate.enable(values.enable = getFieldValue(event))),
    date : (event) => refreshErrorSummary(() => validate.date(values.date = getFieldValue(event))),
    country : (event) => refreshErrorSummary(() => validate.country(values.country = getFieldValue(event))),

    submit : (event) =>
    {
        event.preventDefault()

        refreshErrorSummary(() => validate.all())

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

// Portfolios & malt & other
// Vidéo
// Share linkedin : dispo pour être indépendant à la mi-juin
// copy pastenote