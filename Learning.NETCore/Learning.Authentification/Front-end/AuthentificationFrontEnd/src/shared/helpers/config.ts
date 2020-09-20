interface ApplicationConfiguration
{
    apiUrl : string,
    googleClientId : string,
    facebookAppId : string,
}

const developmentConfiguration : ApplicationConfiguration =
{
    apiUrl : "http://localhost:51880/api",
    // faked ids
    googleClientId : "461805aofckmsrulsi54n1.apps.googleusercontent.com",
    facebookAppId : "69882"
};

export default developmentConfiguration;