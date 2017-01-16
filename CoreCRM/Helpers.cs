using CoreCRM;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Primitives;

namespace CoreCRM
{
    public class Helpers : IHelpers
    {
        public string GetReferer(HttpContext httpContext, string defaultValue = null)
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
