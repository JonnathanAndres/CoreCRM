using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace CoreCRM.Models
{
    public enum AccountState
    {
        [Display(Name="可用")]
        Enabled = 0,
        [Display(Name = "ͣ停用")]
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
