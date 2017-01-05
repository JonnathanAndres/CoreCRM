using System.ComponentModel.DataAnnotations;
using CoreCRM.Models;
using Microsoft.AspNetCore.Http;

namespace CoreCRM.ViewModels
{
    public class ProfileViewModel
    {
        [MaxLength(256)]
        public string Avatar { get; set; }
        public IFormFile AvatarFile { get; set; }

        [MinLength(1)]
        [MaxLength(32)]
        public string UserName { get; set; }

        public AccountState AccountState { get; set; }

        [MaxLength(32)]
        public string Department { get; set; }

        [MaxLength(32)]
        public string Position { get; set; }

        public Gender Gender { get; set; }

        [EmailAddress]
        [MaxLength(64)]
        public string Email { get; set; }

        [MaxLength(15)]
        [Phone]
        public string Phone { get; set; }

        [MaxLength(128)]
        public string Address { get; set; }
    }
}
