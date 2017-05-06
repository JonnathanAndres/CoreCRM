﻿using CoreCRM.Models;
using CoreCRM.Services;
using CoreCRM.ViewModels.AccountViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System.Threading.Tasks;

namespace CoreCRM.Areas.Api.Controllers
{
    [Authorize]
    public class AccountController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IEmailSender _emailSender;
        private readonly ISmsSender _smsSender;
        private readonly ILogger _logger;
        private readonly string _externalCookieScheme;

        public AccountController(
             UserManager<ApplicationUser> userManager,
             SignInManager<ApplicationUser> signInManager,
             IOptions<IdentityCookieOptions> identityCookieOptions,
             IEmailSender emailSender,
             ISmsSender smsSender,
             ILoggerFactory loggerFactory)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _externalCookieScheme = identityCookieOptions.Value.ExternalCookieAuthenticationScheme;
            _emailSender = emailSender;
            _smsSender = smsSender;
            _logger = loggerFactory.CreateLogger<AccountController>();
        }

        //
        // POST: /Account/Login
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<JsonResult> Login(LoginViewModel model, string returnUrl = null)
        {
            if (ModelState.IsValid)
            {
                var user = await _userManager.FindByNameAsync(model.Account);
                if (user == null)
                {
                    user = await _userManager.FindByEmailAsync(model.Account);
                }
                if (user == null)
                {
                    ModelState.AddModelError(string.Empty, "用户不存在");
                    return View(model);
                }

                // This doesn't count login failures towards account lockout
                // To enable password failures to trigger account lockout, set lockoutOnFailure: true
                var result = await _signInManager.PasswordSignInAsync(user, model.Password, model.RememberMe, lockoutOnFailure: false);
                if (result.Succeeded)
                {
                    _logger.LogInformation(1, "User logged in.");
                    return Json(new ReturnModels.LoginModel()
                    {
                        Code = 0,
                        Message = "登录成功",
                        ReturnUrl = returnUrl
                    });
                }
                if (result.IsLockedOut)
                {
                    _logger.LogWarning(2, "User account locked out.");
                    return Json(new ReturnModels.LoginModel()
                    {
                        Code = 1001,
                        Message = "用户被锁定",
                        ReturnUrl = returnUrl
                    });
                }
                else
                {
                    return Json(new ReturnModels.LoginModel()
                    {
                        Code = 1002,
                        Message = "登录失败",
                        ReturnUrl = returnUrl
                    });
                }
            }

            // If we got this far, something failed, redisplay form
            return Json(new ReturnModels.LoginModel()
            {
                Code = 1002,
                Message = "登录失败",
                ReturnUrl = returnUrl
            });
        }

        //
        // POST: /Account/Logout
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<JsonResult> Logout()
        {
            await _signInManager.SignOutAsync();
            _logger.LogInformation(4, "User logged out.");
            return Json(new ReturnModels.BaseModel()
            {
                Code = 0,
                Message = "退出成功"
            });
        }
    }
}
