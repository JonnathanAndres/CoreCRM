using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using CoreCRM.Data;
using CoreCRM.Models;
using CoreCRM.Services;
using CoreCRM.Repositories;

namespace CoreCRM
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true);

            if (env.IsDevelopment())
            {
                // For more details on using the user secret store see https://go.microsoft.com/fwlink/?LinkID=532709
                builder.AddUserSecrets<Startup>();
            }

            builder.AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; protected set; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Add framework services.
            services.AddOptions();

            ConfigureDbContext(services);

            services.AddIdentity<ApplicationUser, IdentityRole>(options =>
            {
                var pwOptions = new Options.PasswordOptions();
                Configuration.GetSection("Password").Bind(pwOptions);

                options.Password.RequireDigit = pwOptions.RequireDigit;
                options.Password.RequiredLength = pwOptions.RequiredLength;
                options.Password.RequireLowercase = pwOptions.RequireLowercase;
                options.Password.RequireNonAlphanumeric = pwOptions.RequireNonAlphanumeric;
                options.Password.RequireUppercase = pwOptions.RequireUppercase;
            })
            .AddEntityFrameworkStores<ApplicationDbContext>()
            .AddDefaultTokenProviders();

            services.AddAntiforgery(options => options.HeaderName = "X-CSRF-TOKEN");
            services.AddMvc();

            // Add application services.
            services.AddTransient<IEmailSender, AuthMessageSender>();
            services.AddTransient<ISmsSender, AuthMessageSender>();
            services.AddSingleton<IProfileRepository, ProfileRepository>();

        }

        protected virtual void ConfigureDbContext(IServiceCollection services)
        {
            services.AddDbContext<ApplicationDbContext>(options => {
                //options.UseMySQL(Configuration.GetConnectionString("MySQLConnection"));
                options.UseInMemoryDatabase();
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            using (var serviceScope = app.ApplicationServices
                                         .GetRequiredService<IServiceScopeFactory>()
                                         .CreateScope())
            {

                var dbContext = serviceScope.ServiceProvider
                                            .GetService<ApplicationDbContext>();

                EnsureDatabaseCreated(app, dbContext);
            }

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseDatabaseErrorPage();
                app.UseBrowserLink();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseStaticFiles();

            app.UseIdentity();

            // Add external authentication middleware below. To configure them please see https://go.microsoft.com/fwlink/?LinkID=532715

            app.UseMvc(routes =>
            {
                routes.MapRoute(name: "areaRoute",
                    template: "{area}/{controller}/{action}");

                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}");

                routes.MapRoute(
                    name: "redirectRoute",
                    template: "{controller}/{*path}",
                    defaults: new { action="Index" });

                routes.MapSpaFallbackRoute(
                    name: "spa-fallback",
                    defaults: new { controller = "Home", action = "Index" });
            });

            // Seed test data.
            if (env.IsDevelopment())
            {
                Task.Run(() => SeedData.Initialize(app.ApplicationServices));
            }
        }

        protected virtual void EnsureDatabaseCreated(IApplicationBuilder app, ApplicationDbContext dbContext)
        {
            // run Migrations
            //dbContext.Database.Migrate();
            //dbContext.Database.EnsureCreated();
        }
    }
}
