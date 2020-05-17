using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Serilog;

namespace TestData.App.UI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            /*
            var host = new WebHostBuilder()
                .UseKestrel()
                .UseContentRoot(Directory.GetCurrentDirectory())
                .UseIISIntegration()
                .UseStartup<Startup>()
                .Build();

            host.Run();
            */
            CreateWebHostBuilder(args).Build().Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                /*
                .ConfigureAppConfiguration((hostingContext, config) =>
                {
                    //config.SetBasePath(Path.Combine(Directory.GetCurrentDirectory(), "TestFrontEnd"));
                    config.SetBasePath(Directory.GetCurrentDirectory());
                    config.AddJsonFile("appsettings.json", optional: false, reloadOnChange: false);
#if DEBUG // we only use specific file for Development, for other environments we use tokenisation
                    config.AddJsonFile($"appsettings.Development.json", optional: false, reloadOnChange: false);
#endif
                    // config.AddEnvironmentVariables("APPSETTING_");
                })
                */
                .ConfigureLogging((hostingContext, logging) =>
                {
                    logging.AddConfiguration(hostingContext.Configuration.GetSection("Logging"));
                    logging.AddConsole();
                    logging.AddDebug();
                    logging.AddEventSourceLogger();
                    var logPath = hostingContext.Configuration["Settings:LogPath"];
                    if (string.IsNullOrEmpty(logPath)) logPath = Path.Combine(Path.GetTempPath(), "app-ui");
                    Log.Logger = new LoggerConfiguration()
                        .WriteTo.RollingFile(pathFormat: $"{logPath}/logs/log-{{Date}}.log")
                        .WriteTo.Console()
                        .CreateLogger();
                })
                .UseSerilog()
                .UseStartup<Startup>();

    }
}
