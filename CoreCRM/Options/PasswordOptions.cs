using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoreCRM.Options
{
    public class PasswordOptions
    {
        public PasswordOptions()
        {
            RequireDigit = true;
            RequiredLength = 8;
            RequireLowercase = true;
            RequireNonAlphanumeric = true;
            RequireUppercase = true;
        }

        public bool RequireDigit { get; set; }
        public int RequiredLength { get; set; }
        public bool RequireLowercase { get; set; }
        public bool RequireNonAlphanumeric { get; set; }
        public bool RequireUppercase { get; set; }
    }
}
