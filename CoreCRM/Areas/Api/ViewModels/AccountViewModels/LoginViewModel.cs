using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace CoreCRM.Areas.Api.ViewModels.AccountViewModels
{
    public class LoginViewModel
    {
        [Required]
        public string Account { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [Display(Name = "Remember me?")]
        public bool RememberThisWeek { get; set; }
    }
}
