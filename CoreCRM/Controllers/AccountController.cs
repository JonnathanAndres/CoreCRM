using System.Net;
using Microsoft.AspNetCore.Mvc;

namespace CoreCRM.Controllers
{
    public class AccountController : Controller
    {
        //
        // GET: /Account
        [HttpGet]
        public IActionResult Index(string path, string returnUrl)
        {
            if (path != null)
            {
                string url = Url.Action("Index", ControllerContext.ActionDescriptor.ControllerName);
                if (returnUrl != null) {
                    url = $"{url}?returnUrl={WebUtility.UrlEncode(returnUrl)}";
                }
                url = $"{url}#/{path}";

                Response.Cookies.Append("client-path", path);
                return new RedirectResult(url);
            }
            else
            {
                ViewData["Controller"] = ControllerContext.ActionDescriptor.ControllerName;
                ViewData["ReturnUrl"] = returnUrl;
                return View();
            }
        }

        //
        // GET /Account/AccessDenied
        [HttpGet]
        public IActionResult AccessDenied()
        {
            return View();
        }
    }
}
