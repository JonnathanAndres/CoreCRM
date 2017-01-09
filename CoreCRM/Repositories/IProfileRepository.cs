using System.Threading.Tasks;
using CoreCRM.Data;
using CoreCRM.Models;
using CoreCRM.ViewModels;

namespace CoreCRM.Repositories
{
    public interface IProfileRepository
    {
        Task<Profile> GetUserProfileAsync(ApplicationUser user);

        Task<ProfileViewModel> GetUserProfileViewModelAsync(ApplicationUser user);
        Task UpdateUserProfileAsync(ApplicationUser user, ProfileViewModel model);
    }
}
