interface ApplicationConfiguration
{
    apiUrl : string
}

const developmentConfiguration : ApplicationConfiguration =
{
    apiUrl : "http://localhost:51880/api"
};

export default developmentConfiguration;