using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CoreCRM.Extensions.ExampleAPI.Controllers
{
    [Authorize]
    public class DefaultController
    {
        public IActionResult Index()
        {
            return new JsonResult(new { Name = "User Name" });
        }
    }
}