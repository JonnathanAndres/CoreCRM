using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CoreCRM.Extensions.ExampleAPI.Controllers
{
    [Authorize]
    public class DefaultController : Controller
    {
        public IActionResult Index()
        {
            return new JsonResult(from c in User.Claims select new { c.Type, c.Value });
        }
    }
}