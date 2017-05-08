using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoreCRM.Areas.Api.ResultModels
{
    public class BaseModel
    {
        public int Code { get; set; }
        public string Message { get; set; }
        public string Extra { get; set; }
    }
}
