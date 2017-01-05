using System.ComponentModel.DataAnnotations;

namespace CoreCRM.Models
{
    public enum Gender
    {
        Male = 0,
        Female = 1
    }

    public class Profile
    {
        public int Id { get; set; }

        // 1-to-1 relationship
        public string AccountID { get; set; }

        [MaxLength(256)]
        public string Avatar { get; set; }
        public Gender Gender { get; set; }
        [MaxLength(256)]
        public string Address { get; set; }
    }
}
