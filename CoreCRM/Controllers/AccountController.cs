using System;
using System.Net;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Routing;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Authorization;
using CoreCRM.Models;
using CoreCRM.Services;
using CoreCRM.ViewModels.AccountViewModels;
using CoreCRM.Models.AccountViewModels;

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
