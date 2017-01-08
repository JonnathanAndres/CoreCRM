using System;
using System.Diagnostics;
using System.Security.Claims;
using System.Threading.Tasks;
using CoreCRM.Data;
using CoreCRM.Models;
using CoreCRM.ViewModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace CoreCRM.Repositories
{
    public class ProfileRepository : IProfileRepository
    {
        private UserManager<ApplicationUser> _userManager;
        private ApplicationDbContext _dbContext;

        public ProfileRepository(UserManager<ApplicationUser> userManager, ApplicationDbContext dbContext)
        {
            _userManager = userManager;
            _dbContext = dbContext;
        }

        async Task<Profile> IProfileRepository.GetUserProfileAsync(ClaimsPrincipal userClaimsPrincipal)
        {
            var user = await _userManager.GetUserAsync(userClaimsPrincipal);
            if (user.ProfileID > 0) {
                return await _dbContext.Profiles.SingleOrDefaultAsync(m => m.Id == user.ProfileID);
            } else {
                return null;
            }
        }

        public async Task<ProfileViewModel> GetUserProfileViewModelAsync(ClaimsPrincipal userClaimsPrincipal)
        {
            var user = await _userManager.GetUserAsync(userClaimsPrincipal);

            if (user.ProfileID > 0) {
                var profile = await _dbContext.Profiles.SingleOrDefaultAsync(m => m.Id == user.ProfileID);
                return FillViewModel(user, profile);
            }
            else {
                return FillViewModel(user, null);
            }
        }

        private static ProfileViewModel FillViewModel(ApplicationUser user, Profile profile)
        {
            return new ProfileViewModel() {
                UserName = user.UserName,
                Email = user.Email,
                Phone = user.PhoneNumber,
                AccountState = user.State,

                Avatar = profile == null ? "" : profile.Avatar,
                Gender = profile == null ? Gender.Male : profile.Gender,
                Address = profile == null ? "" : profile.Address,

                Position = "--",
                Department = "--",
            };
        }

        public async Task UpdateUserProfileAsync(ClaimsPrincipal userClaimsPrincipal, ProfileViewModel model)
        {
            var user = await _userManager.GetUserAsync(userClaimsPrincipal);
            if (user.ProfileID == 0) {
                // Create a new profile
                var newProfile = new Profile() {
                    AccountID = await _userManager.GetUserIdAsync(user),
                    Avatar = model.AvatarFile.FileName,
                    Gender = model.Gender,
                    Address = model.Address
                };
                await _dbContext.Profiles.AddAsync(newProfile);
                await _dbContext.SaveChangesAsync();

                // TODO: Update current user's ProfileID
            } else {
                // Update exists profile
                var profile = await _dbContext.Profiles.SingleOrDefaultAsync(m => m.Id == user.ProfileID);

                profile.Gender = model.Gender;
                profile.Address = model.Address;
                
                if (model.AvatarFile != null) {
                    profile.Avatar = model.AvatarFile.FileName;
                }
                await _dbContext.AddAsync(profile);
                await _dbContext.SaveChangesAsync();
            }

            // Update currentUser
        }

        public Task UpdateUserProfileAsync(string userId, ProfileViewModel model)
        {
            throw new NotImplementedException();
        }

        public Task<ProfileViewModel> GetUserProfileViewModelAsync(string id)
        {
            throw new NotImplementedException();
        }
    }
}
