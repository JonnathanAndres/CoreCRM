using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace CoreCRM.Models
{
    public enum AccountState
    {
        [Display(Name="∆Ù”√")]
        Enabled = 0,
        [Display(Name = "Õ£”√")]
        Disabled
    }

    // Add profile data for application users by adding properties to the ApplicationUser class
    public class ApplicationUser : IdentityUser
    {
        public int ProfileID { get; set; }
        public AccountState State { get; set; }

        public Profile Profile { get; set; }
    }
}
