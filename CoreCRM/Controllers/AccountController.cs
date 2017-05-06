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

namespace CoreCRM.Controllers
{
    public class AccountController : Controller
    {
        //
        // GET: /Account/Login
        [HttpGet]
        public IActionResult Index(string returnUrl)
        {
            ViewData["ReturnUrl"] = returnUrl;
            return View();
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
