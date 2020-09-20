using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace Learning.PartialFields.API
{
    public class Startup
    {
        // hide null properties from JSON response.
        public void ConfigureServices(IServiceCollection services) => services.AddMvc().AddJsonOptions(options => options.JsonSerializerOptions.IgnoreNullValues = true);

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
                app.UseDeveloperExceptionPage();

            app.UseRouting();

            app.UseEndpoints(endpoints => endpoints.MapControllers());
        }
    }
}
