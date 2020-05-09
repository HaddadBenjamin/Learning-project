interface ApplicationConfiguration
{
    apiUrl : string,
    googleClientId : string
}

const developmentConfiguration : ApplicationConfiguration =
{
    apiUrl : "http://localhost:51880/api",
    googleClientId : "461833985493-rfs3kvem9m4uk705aofckmsrulsi54n1.apps.googleusercontent.com"
};

export default developmentConfiguration;