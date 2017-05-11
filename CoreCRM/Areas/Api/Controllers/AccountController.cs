using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using CoreCRM.Models;
using CoreCRM.Services;
using CoreCRM.Areas.Api.Constants;
using CoreCRM.Areas.Api.ViewModels.AccountViewModels;
using Microsoft.AspNetCore.Http;

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
        public async Task<JsonResult> Login([FromBody] LoginViewModel model)
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
                    });
                }

                // This doesn't count login failures towards account lockout
                // To enable password failures to trigger account lockout, set lockoutOnFailure: true
                var signInResult = await _signInManager.PasswordSignInAsync(user, model.Password, model.RememberThisWeek, lockoutOnFailure: false);
                if (signInResult.Succeeded)
                {
                    _logger.LogInformation(1, "User logged in.");

                    if (model.RememberThisWeek)
                    {
                        // Modify the login token expire time to this week end.
                        const string IDENTITY_TOKEN_NAME = ".AspNetCore.Identity.Application";
                        string identifyToken = ExtractIdentityToken(IDENTITY_TOKEN_NAME);

                        Response.Cookies.Append(IDENTITY_TOKEN_NAME, identifyToken, new CookieOptions()
                        {
                            HttpOnly = true,
                            Path = "/",
                            Expires = new DateTimeOffset(Utils.GetNextEndOfWeek())
                        });
                    }
 
                    return Json(new ResultModels.LoginResult()
                    {
                        Code = (int)ReturnCode.OK,
                        Message = ReturnCode.OK.ToString("G")
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
                            Message = ReturnCode.LOGIN_FAILED_USER_LOCKEDOUT.ToString("G")
                        });
                    }
                    else
                    {
                        return Json(new ResultModels.LoginResult()
                        {
                            Code = (int)ReturnCode.LOGIN_FAILED,
                            Message = ReturnCode.LOGIN_FAILED.ToString("G"),
                            Errors = signInResult.ToString()
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
                        extras.Add($"\"{error.ErrorMessage}\"");
                    }
                }

                return Json(new ResultModels.LoginResult()
                {
                    Code = (int)ReturnCode.LOGIN_FAILED,
                    Message = ReturnCode.LOGIN_FAILED.ToString("G"),
                    Errors = "[" + string.Join(",", extras) + "]"
                });
            }
        }

        private string ExtractIdentityToken(string IDENTITY_TOKEN_NAME)
        {
            foreach (var header in Response.Headers.Values)
            {
                var headerValue = header.ToString();
                if (headerValue.StartsWith(IDENTITY_TOKEN_NAME))
                {
                    var cookieSegments = headerValue.Split(new char[] { ';' });
                    var indexOfEqual = cookieSegments[0].IndexOf('=');
                    return cookieSegments[0].Substring(indexOfEqual + 1);
                }
            }

            throw new Exception("Identity token not found.");
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
