using System.ComponentModel.DataAnnotations;

namespace CoreCRM.ViewModels.AccountViewModels
{
    public class LoginViewModel
    {
        [Required]
        public string Account { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [Display(Name = "Remember me?")]
        public bool RememberMe { get; set; }
    }
}
