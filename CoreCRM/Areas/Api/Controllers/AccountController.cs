using CoreCRM.Areas.Api.Constants;
using CoreCRM.Models;
using CoreCRM.Services;
using CoreCRM.ViewModels.AccountViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
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
                    return Json(new ResultModels.LoginResult()
                    {
                        Code = (int)ReturnCode.LOGIN_FAILED_USER_NOT_EXISTS,
                        Message = Constants.ReturnCode.LOGIN_FAILED_USER_NOT_EXISTS.ToString("G"),
                        ReturnUrl = returnUrl
                    });
                }

                // This doesn't count login failures towards account lockout
                // To enable password failures to trigger account lockout, set lockoutOnFailure: true
                var signInResult = await _signInManager.PasswordSignInAsync(user, model.Password, model.RememberMe, lockoutOnFailure: false);
                if (signInResult.Succeeded)
                {
                    _logger.LogInformation(1, "User logged in.");

                    Response.Cookies.Append("remember-this-week", "T", new Microsoft.AspNetCore.Http.CookieOptions() {
                        HttpOnly = true,
                        Path = "/",
                        Expires = new DateTimeOffset(Utils.GetNextEndOfWeek())
                    });

                    return Json(new ResultModels.LoginResult()
                    {
                        Code = (int)ReturnCode.OK,
                        Message = ReturnCode.OK.ToString("G"),
                        ReturnUrl = returnUrl
                    });
                }
                else
                {
                    if (signInResult.IsLockedOut)
                    {
                        _logger.LogWarning(2, "User account locked out.");
                        return Json(new ResultModels.LoginResult()
                        {
                            Code = (int)ReturnCode.LOGIN_FAILED_USER_LOCKEDOUT,
                            Message = ReturnCode.LOGIN_FAILED_USER_LOCKEDOUT.ToString("G"),
                            ReturnUrl = returnUrl
                        });
                    }
                    else
                    {
                        return Json(new ResultModels.LoginResult()
                        {
                            Code = (int)ReturnCode.LOGIN_FAILED,
                            Message = ReturnCode.LOGIN_FAILED.ToString("G"),
                            ReturnUrl = returnUrl,
                            Extra = signInResult.ToString()
                        });
                    }
                }
            }
            else
            {
                // Invalid model.
                List<string> extras = new List<string>();
                foreach (var modelState in ViewData.ModelState.Values)
                {
                    foreach (var error in modelState.Errors)
                    {
                        extras.Add(error.ErrorMessage);
                    }
                }

                return Json(new ResultModels.LoginResult()
                {
                    Code = (int)ReturnCode.LOGIN_FAILED,
                    Message = ReturnCode.LOGIN_FAILED.ToString("G"),
                    ReturnUrl = returnUrl,
                    Extra = "[" + string.Join(",", extras) + "]";
                });
            }
        }

        //
        // POST: /Account/Logout
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<JsonResult> Logout()
        {
            await _signInManager.SignOutAsync();
            _logger.LogInformation(4, "User logged out.");
            return Json(new ResultModels.BaseModel()
            {
                Code = (int)ReturnCode.OK,
                Message = ReturnCode.OK.ToString("G")
            });
        }
    }
}
