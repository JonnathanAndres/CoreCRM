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
        public ProfileController(UserManager<ApplicationUser> userManager, IProfileRepository repository) {
            _userManager = userManager; 
            _repository = repository; 
        }

        // GET: /Profile/<id?>
        public async Task<IActionResult> Index(string id) {
            ViewData["ReturnUrl"] = ControllerHelpers.GetReferer(HttpContext, "/"); 

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
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Index(ProfileViewModel model, string id) {
            if (ModelState.IsValid) {
                if (string.IsNullOrEmpty(id)) {
                    var user = await _userManager.GetUserAsync(HttpContext.User); 
                    await _repository.UpdateUserProfileAsync(user, model); 
                }
                else {
                    var user = await _userManager.FindByIdAsync(id); 
                    if (user != null) {
                        await _repository.UpdateUserProfileAsync(user, model); 
                    }
                    else {
                        return NotFound(); 
                    }
                }
                return RedirectToAction("Index", "Home"); 
            }
            return View(model); 
        }
    }
}
