using System;
using System.Collections.Generic;
using ExtCore.Infrastructure.Actions;
using IdentityServer4.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace CoreCRM.Extensions.IdentityServer4.Actions
{
    public class ConfigureServicesAction : IConfigureServicesAction
    {
        public void Execute(IServiceCollection services, IServiceProvider serviceProvider)
        {
            services.AddMvcCore()
                .AddAuthorization()
                .AddJsonFormatters();
            
            services.AddIdentityServer()
                    .AddDeveloperSigningCredential()
                    .AddInMemoryApiResources(this.GetApiResources())
                    .AddInMemoryClients(this.GetClients());
 
            services.AddAuthentication("Bearer")
                .AddIdentityServerAuthentication(options =>
                {
                    options.Authority = "http://localhost:5000";
                    options.RequireHttpsMetadata = false;

                    options.ApiName = "api1";
                });
        }
        
        private IEnumerable<ApiResource> GetApiResources()
        {
            return new List<ApiResource>
            {
                new ApiResource("api1", "My API")
            };
        }
        
        private IEnumerable<Client> GetClients()
        {
            return new List<Client>
            {
                new Client
                {
                    ClientId = "client",

                    // no interactive user, use the clientid/secret for authentication
                    AllowedGrantTypes = GrantTypes.ClientCredentials,

                    // secret for authentication
                    ClientSecrets =
                    {
                        new Secret("secret".Sha256())
                    },

                    // scopes that client has access to
                    AllowedScopes = { "api1" }
                }
            };
        }

        public int Priority => 1000;
    }
}