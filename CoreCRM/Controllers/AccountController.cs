using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using CoreCRM.Models;
using CoreCRM.Services;
using CoreCRM.ViewModels.AccountViewModels;
using CoreCRM.Models.AccountViewModels;
using Microsoft.AspNetCore.Mvc.Routing;

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
                string url = $"/Account?returnUrl={returnUrl}#/{path}";
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
