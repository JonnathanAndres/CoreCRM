using System.Threading.Tasks;
using CoreCRM.Repositories;
using CoreCRM.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Primitives;

namespace CoreCRM.Controllers
{
    [Authorize]
    public class ProfileController : Controller
    {
        IProfileRepository _repository;
        public ProfileController(IProfileRepository repo)
        {
            _repository = repo;
        }

        // GET: /Profile/
        public async Task<IActionResult> Index()
        {
            StringValues referer;
            if (HttpContext.Request.Headers.TryGetValue("Referer", out referer)) {
                ViewData["ReturnUrl"] = referer.ToString();
            } else {
                ViewData["ReturnUrl"] = "/";
            }

            var model = await _repository.GetCurrentUserProfileViewModelAsync(HttpContext.User);
            return View(model);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Index(ProfileViewModel model)
        {
            if (ModelState.IsValid) {
                await _repository.UpdateProfileAsync(HttpContext.User, model);
                return RedirectToAction("Index", "Home");
            }
            return View(model);
        }
    }
}
