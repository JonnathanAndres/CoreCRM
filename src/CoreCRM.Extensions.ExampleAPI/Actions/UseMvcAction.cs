using System;
using ExtCore.Mvc.Infrastructure.Actions;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Routing;

namespace CoreCRM.Extensions.ExampleAPI.Actions
{
    public class UseMvcAction : IUseMvcAction
    {
        public void Execute(IRouteBuilder routeBuilder, IServiceProvider serviceProvider)
        {
            routeBuilder.MapRoute("ExampleAPI", "api/v1/{controller}/{action}", new { controller = "Default", action = "Index" });
        }

        public int Priority => 1000;
    }
}