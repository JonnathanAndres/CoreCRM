using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoreCRM.Areas.Api.ReturnModels
{
    public class LoginModel : BaseModel
    {
        public string ReturnUrl { get; set; }
    }
}
