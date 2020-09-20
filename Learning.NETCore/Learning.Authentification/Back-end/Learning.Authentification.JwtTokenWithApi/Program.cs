using Microsoft.AspNetCore.Hosting;
using Microsoft.Azure.KeyVault;
using Microsoft.Azure.Services.AppAuthentication;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Configuration.AzureKeyVault;
using Microsoft.Extensions.Hosting;

namespace Learning.Authentification.JwtTokenWithApi
{
    public class Program
    {
        public static void Main(string[] args) => CreateHostBuilder(args).Build().Run();

        public static IHostBuilder CreateHostBuilder(string[] args) => Host
            .CreateDefaultBuilder(args)
            .ConfigureAppConfiguration((webHostBuilderContext, configurationBuilder) =>
            {
                var vaultEndpoint = "https://benjamintestvault.vault.azure.net/";
                var azureServiceTokenProvider = new AzureServiceTokenProvider();
                var defaultKeyVaultSecretManager = new DefaultKeyVaultSecretManager();
                var authentificationCallback = new KeyVaultClient.AuthenticationCallback(azureServiceTokenProvider.KeyVaultTokenCallback);
                var keyVaultClient = new KeyVaultClient(authentificationCallback);

                configurationBuilder.AddAzureKeyVault(vaultEndpoint, keyVaultClient, defaultKeyVaultSecretManager);
            })
            .ConfigureWebHostDefaults(webBuilder => webBuilder.UseStartup<Startup>());
    }
}
