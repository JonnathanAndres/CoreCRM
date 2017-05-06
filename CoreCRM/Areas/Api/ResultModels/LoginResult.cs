using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoreCRM.Areas.Api.ResultModels
{
    public class LoginResult : BaseModel
    {
        public string ReturnUrl { get; set; }
    }
}
