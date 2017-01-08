using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Primitives;

namespace CoreCRM
{
    public class ControllerHelpers
    {
        public static string GetReferer(HttpContext httpContext, string defaultValue = null)
        {
            StringValues referer;
            if (httpContext.Request.Headers.TryGetValue("Referer", out referer)) {
                return referer.ToString();
            }
            else {
                return defaultValue;
            }
        }
    }
}
