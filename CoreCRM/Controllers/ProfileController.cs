using System;
using System.Threading.Tasks; 
using CoreCRM.Models; 
using CoreCRM.Repositories; 
using CoreCRM.ViewModels; 
using Microsoft.AspNetCore.Identity; 
using Microsoft.AspNetCore.Authorization; 
using Microsoft.AspNetCore.Mvc; 

namespace CoreCRM.Controllers {
    [Authorize]
    public class ProfileController:Controller {
        private UserManager<ApplicationUser> _userManager; 
        private IProfileRepository _repository;
        private IHelpers _helpers;
        public ProfileController(UserManager<ApplicationUser> userManager, IProfileRepository repository, IHelpers helpers)
        {
            _userManager = userManager; 
            _repository = repository;
            _helpers = helpers;
        }

        // GET: /Profile/<id?>
        [Authorize]
        public async Task<IActionResult> Index(string id, string returnUrl=null) {
            ViewData["ReturnUrl"] = _helpers.GetReferer(HttpContext, returnUrl ?? "/"); 

            ProfileViewModel model;
            if (string.IsNullOrEmpty(id)) {
                var user = await _userManager.GetUserAsync(HttpContext.User); 
                model = await _repository.GetUserProfileViewModelAsync(user); 
            }
            else {
                var user = await _userManager.FindByIdAsync(id); 
                if (user != null) {
                    model = await _repository.GetUserProfileViewModelAsync(user); 
                }
                else {
                    ModelState.AddModelError(string.Empty, "没有找到对应的用户"); 
                    return NotFound(); 
                }
            }
            return View(model); 
        }

        // POST: /Profile/<id?>
        [HttpPost]
        [Authorize]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Index(ProfileViewModel model, string id) {
            if (ModelState.IsValid) {
                ApplicationUser user = null;
                if (string.IsNullOrEmpty(id)) {
                    user = await _userManager.GetUserAsync(HttpContext.User); 
                }
                else {
                    user = await _userManager.FindByIdAsync(id); 
                }

                if (user != null) {
                    await _repository.UpdateUserProfileAsync(user, model); 
                }
                else {
                    return NotFound(); 
                }
            }
            return View(model); 
        }
    }
}
