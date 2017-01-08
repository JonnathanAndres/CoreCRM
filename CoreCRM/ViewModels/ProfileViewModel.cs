using System.ComponentModel.DataAnnotations;
using CoreCRM.Models;
using Microsoft.AspNetCore.Http;

namespace CoreCRM.ViewModels
{
    public class ProfileViewModel
    {
        [StringLength(256)]
        public string Avatar { get; set; }
        public IFormFile AvatarFile { get; set; }

        [Required]
        [StringLength(32)]
        public string UserName { get; set; }

        public AccountState AccountState { get; set; }

        [StringLength(32)]
        public string Department { get; set; }

        [StringLength(32)]
        public string Position { get; set; }

        public Gender Gender { get; set; }

        [EmailAddress]
        [StringLength(64)]
        public string Email { get; set; }

        [Phone]
        [StringLength(15)]
        public string Phone { get; set; }

        [StringLength(128)]
        public string Address { get; set; }
    }
}
