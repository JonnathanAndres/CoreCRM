using System.Security.Claims;
using System.Threading.Tasks;
using CoreCRM.Models;
using CoreCRM.ViewModels;

namespace CoreCRM.Repositories
{
    public interface IProfileRepository
    {
        Task<Profile> GetCurrentUserProfileAsync(ClaimsPrincipal user);
        Task<ProfileViewModel> GetCurrentUserProfileViewModelAsync(ClaimsPrincipal user);
        Task UpdateProfileAsync(ClaimsPrincipal user, ProfileViewModel model);
    }
}
