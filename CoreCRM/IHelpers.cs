using Microsoft.AspNetCore.Http;

namespace CoreCRM
{
    public interface IHelpers
    {
        string GetReferer(HttpContext httpContext, string defaultValue);
    }
}