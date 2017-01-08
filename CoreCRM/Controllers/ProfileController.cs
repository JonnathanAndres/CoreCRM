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

        // GET: /Profile/<id?>
        public async Task<IActionResult> Index(string id)
        {
            ViewData["ReturnUrl"] = ControllerHelpers.GetReferer(HttpContext, "/");

            ProfileViewModel model;
            if (id == null) {
                model = await _repository.GetUserProfileViewModelAsync(HttpContext.User);
            } else {
                model = await _repository.GetUserProfileViewModelAsync(id);
            }
            return View(model);
        }

        // POST: /Profile/<id?>
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Index(ProfileViewModel model, string id)
        {
            if (ModelState.IsValid) {
                if (id == null) {
                    await _repository.UpdateUserProfileAsync(HttpContext.User, model);
                } else {
                    await _repository.UpdateUserProfileAsync(id, model);
                }
                return RedirectToAction("Index", "Home");
            }
            return View(model);
        }
    }
}
