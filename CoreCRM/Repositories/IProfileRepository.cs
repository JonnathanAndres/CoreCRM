using System.Security.Claims;
using System.Threading.Tasks;
using CoreCRM.Models;
using CoreCRM.ViewModels;

namespace CoreCRM.Repositories
{
    public interface IProfileRepository
    {
        Task<Profile> GetUserProfileAsync(ClaimsPrincipal userClaimsPrincipal);

        Task<ProfileViewModel> GetUserProfileViewModelAsync(string userId);
        Task<ProfileViewModel> GetUserProfileViewModelAsync(ClaimsPrincipal userClaimsPrincipal);
        Task UpdateUserProfileAsync(ClaimsPrincipal userClaimsPrincipal, ProfileViewModel model);
        Task UpdateUserProfileAsync(string userId, ProfileViewModel model);
    }
}
