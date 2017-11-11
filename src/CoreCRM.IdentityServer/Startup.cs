using System;
using System.Collections.Generic;
using System.Linq;
using CoreCRM.IdentityServer.Data;
using CoreCRM.IdentityServer.Models;
using IdentityServer4;
using IdentityServer4.Models;
using IdentityServer4.Test;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using ApiResource = IdentityServer4.Models.ApiResource;
using Client = IdentityServer4.Models.Client;
using IdentityResource = IdentityServer4.Models.IdentityResource;

namespace CoreCRM.IdentityServer
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            var connectionString = Configuration.GetConnectionString(name: "PostgreSQLConnection");

            services.AddEntityFrameworkNpgsql();
            services.AddDbContext<ApplicationDbContext>(options => options.UseNpgsql(connectionString));
            
            services.AddIdentity<ApplicationUser, IdentityRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();

            services.AddMvc();

            // configure identity server with in-memory stores, keys, clients and resources
            services.AddIdentityServer()
                .AddDeveloperSigningCredential()
                .AddTestUsers(this.GetUsers())
                .AddInMemoryIdentityResources(this.GetIdentityResources())
                .AddInMemoryApiResources(this.GetApiResources())
                .AddInMemoryClients(this.GetClients());
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            // this will do the initial DB population
            InitializeDatabase(app);

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseDatabaseErrorPage();
            }
            else
            {
                app.UseExceptionHandler("/Default/Error");
            }

            app.UseStaticFiles();

            // not needed, since UseIdentityServer adds the authentication middleware
            // app.UseAuthentication();
            app.UseIdentityServer();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Default}/{action=Index}/{id?}");
            });
        }
 
        private void InitializeDatabase(IApplicationBuilder app)
        {

        }

        private IEnumerable<IdentityResource> GetIdentityResources()
        {
            return new List<IdentityResource>
            {
                new IdentityResources.OpenId(),
                new IdentityResources.Phone(),
                new IdentityResources.Email(),
                new IdentityResources.Address(),
                new IdentityResources.Profile()
            };
        }

        private IEnumerable<ApiResource> GetApiResources()
        {
            return new List<ApiResource>
            {
                new ApiResource("api.main", "Main API"),
                new ApiResource("api.user_management", "API for user management")
            };
        }
        
        private IEnumerable<Client> GetClients()
        {
            var serviceClient = Configuration.GetSection("ServiceClient");
            var browserClient = Configuration.GetSection("BrowserClient");
            var mvcClient = Configuration.GetSection("MvcClient");

            var clients = new List<Client>
            {
                new Client
                {
                    ClientId = "service.client",
                    ClientName = "Service Client",
                    ClientSecrets = { new Secret(serviceClient.GetValue("Secret", "secret").Sha256()) },

                    AllowedGrantTypes = GrantTypes.ClientCredentials,
                    AllowedScopes = { "api.user_management" }
                },
 
                new Client
                {
                    ClientId = "browser.client",
                    ClientName = "JavaScript Client",
                    ClientUri = browserClient.GetValue<string>("Uri"),

                    AllowedGrantTypes = GrantTypes.Implicit,
                    AllowAccessTokensViaBrowser = true,

                    RedirectUris =           browserClient.GetValue<ICollection<string>>("RedirectUris"),
                    PostLogoutRedirectUris = browserClient.GetValue<ICollection<string>>("PostLogoutRedirectUris"),
                    AllowedCorsOrigins =     browserClient.GetValue<ICollection<string>>("AllowedCorsOrigins"),

                    AllowedScopes =
                    {
                        IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServerConstants.StandardScopes.Profile,
                        IdentityServerConstants.StandardScopes.Email,
                        IdentityServerConstants.StandardScopes.Phone,
                        IdentityServerConstants.StandardScopes.Address,

                        "api.main"
                    }
                },
                
                new Client
                {
                    ClientId = "mvc.client",
                    ClientName = "MVC Client",
                    ClientUri = mvcClient.GetValue<string>("Uri"),

                    AllowedGrantTypes = GrantTypes.Hybrid,
                    AllowOfflineAccess = true,
                    ClientSecrets = { new Secret(mvcClient.GetValue<string>("Secret").Sha256()) },

                    RedirectUris =           mvcClient.GetValue<ICollection<string>>("RedirectUris"),
                    PostLogoutRedirectUris = mvcClient.GetValue<ICollection<string>>("PostLogoutRedirectUris"),
                    FrontChannelLogoutUri =  mvcClient.GetValue<string>("FrontChannelLogoutUri"),

                    AllowedScopes =
                    {
                        IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServerConstants.StandardScopes.Profile,
                        IdentityServerConstants.StandardScopes.Email,
                        IdentityServerConstants.StandardScopes.Phone,
                        IdentityServerConstants.StandardScopes.Address,

                        "api.main"
                    },
                }
            };
                
            return clients;
        }

        private List<TestUser> GetUsers()
        {
            return new List<TestUser>
            {
                new TestUser
                {
                    SubjectId = "1",
                    Username = "alice",
                    Password = "password"
                },
                new TestUser
                {
                    SubjectId = "2",
                    Username = "bob",
                    Password = "password"
                }
            };
        }
        
    }
}