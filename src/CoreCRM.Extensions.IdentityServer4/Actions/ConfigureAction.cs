using System;
using ExtCore.Infrastructure.Actions;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;

namespace CoreCRM.Extensions.IdentityServer4.Actions
{
    public class ConfigureAction : IConfigureAction
    {
        public void Execute(IApplicationBuilder applicationBuilder, IServiceProvider serviceProvider)
        {
            applicationBuilder.UseIdentityServer();
            applicationBuilder.UseAuthentication();
        }

        public int Priority => 1000;
    }
}