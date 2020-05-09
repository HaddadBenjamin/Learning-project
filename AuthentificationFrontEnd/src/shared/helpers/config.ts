interface ApplicationConfiguration
{
    apiUrl : string,
    googleClientId : string
}

const developmentConfiguration : ApplicationConfiguration =
{
    apiUrl : "http://localhost:51880/api",
    // faked
    googleClientId : "461805aofckmsrulsi54n1.apps.googleusercontent.com"
};

export default developmentConfiguration;