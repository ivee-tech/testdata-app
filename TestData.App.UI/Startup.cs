using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using RestSharp;
using System;
using Serilog;
using System.IO;
using Microsoft.AspNetCore.Server.IISIntegration;
using TestData.App.UI.TestData.Models;
using TestData.App.UI.TestData.Data;

namespace TestData.App.UI
{
    public class Startup
    {

        private readonly IWebHostEnvironment env;
        private readonly ILogger<Startup> logger;

        public Startup(IWebHostEnvironment env, ILogger<Startup> logger)
        {
            try
            { 
                this.env = env;
                this.logger = logger;
                var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddEnvironmentVariables();
            if (env.EnvironmentName == Constants.DevEnv)
            {
                builder.AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true);
            }
            Configuration = builder.Build();
            }
            catch (Exception ex)
            {
                logger.LogError(ex, $"Error in Startup(): {ex.Message}");
            }
        }

        public IConfigurationRoot Configuration { get; }


        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

            services.AddAuthentication(IISDefaults.AuthenticationScheme); /*sharedOptions =>
            {
                // sharedOptions.DefaultScheme = IISDefaults.AuthenticationScheme;
                sharedOptions.DefaultAuthenticateScheme = IISDefaults.AuthenticationScheme;
            });*/

            // Add framework services.
            services.AddMvc(options => {
                options.EnableEndpointRouting = false;
            });
            
            // Adds a default in-memory implementation of IDistributedCache.
            services.AddDistributedMemoryCache();
            //services.AddSession(options =>
            //{
            //    options.IdleTimeout = TimeSpan.FromHours(1);
            //    options.Cookie.HttpOnly = true;
            //    options.Cookie.IsEssential = true;
            //});

            services.AddSpaStaticFiles(cfg => {
                cfg.RootPath = "wwwroot/app";
            });

            var fileSystem = new DefaultFileSystem();
            var rep = new JsonFileRepository<Customer, string>(fileSystem);
            rep.Initialize("Data\\customers.json");
            services
                // .AddScoped<ApiExceptionFilterAttribute>()
                // .AddScoped<IConfiguration>(prov => Configuration)
                .AddScoped<IDataQuery<Customer, string>>(prov => rep)
                .AddScoped<IDataCommand<Customer, string>>(prov => rep)
                ;

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ILoggerFactory loggerFactory)
        {
            if (env.EnvironmentName == Constants.DevEnv)
            {
                app.UseDeveloperExceptionPage();
                // app.UseBrowserLink();
            }
            else
            {
                // app.UseExceptionHandler("/Home/Error");
                app.UseDeveloperExceptionPage();
                // app.UseBrowserLink();
            }

            app.UseStaticFiles();
            
            // app.UseSession();

            app.UseAuthentication();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {

                if (env.EnvironmentName == "Development")
                {
                    spa.Options.SourcePath = "app-ui";
                    spa.UseProxyToSpaDevelopmentServer("http://localhost:3100");
                }
            });
        }
    }
}
