using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CoreCRM.Models
{
    public enum AccountState
    {
        [Display(Name = "可用")]
        Enabled = 0,
        [Display(Name = "停用")]
        Disabled
    }
}
