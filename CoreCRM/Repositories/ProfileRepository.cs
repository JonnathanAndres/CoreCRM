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

        async Task<Profile> IProfileRepository.GetCurrentUserProfileAsync(ClaimsPrincipal user)
        {
            var currentUser = await _userManager.GetUserAsync(user);
            if (currentUser.ProfileID > 0) {
                return await _dbContext.Profiles.SingleOrDefaultAsync(m => m.Id == currentUser.ProfileID);
            } else {
                return null;
            }
        }

        public async Task<ProfileViewModel> GetCurrentUserProfileViewModelAsync(ClaimsPrincipal user)
        {
            var currentUser = await _userManager.GetUserAsync(user);

            if (currentUser.ProfileID > 0) {
                var profile = await _dbContext.Profiles.SingleOrDefaultAsync(m => m.Id == currentUser.ProfileID);

                return new ProfileViewModel() {
                    UserName = currentUser.UserName,
                    Email = currentUser.Email,
                    Phone = currentUser.PhoneNumber,
                    AccountState = currentUser.State,

                    Avatar = profile.Avatar,
                    Gender = profile.Gender,
                    Address = profile.Address,

                    Position = "--",
                    Department = "--",
                };
            } else {
                return new ProfileViewModel() {
                    UserName = currentUser.UserName,
                    Email = currentUser.Email,
                    Phone = currentUser.PhoneNumber,
                    AccountState = currentUser.State,

                    Avatar = "",
                    Gender = Gender.Male,
                    Address = "",

                    Position = "--",
                    Department = "--",
                };
            }
        }

        public async Task UpdateProfileAsync(ClaimsPrincipal user, ProfileViewModel model)
        {
            var currentUser = await _userManager.GetUserAsync(user);
            if (currentUser.ProfileID == 0) {
                // Create a new profile
                var newProfile = new Profile() {
                    AccountID = await _userManager.GetUserIdAsync(currentUser),
                    Avatar = model.AvatarFile.FileName,
                    Gender = model.Gender,
                    Address = model.Address
                };
                await _dbContext.Profiles.AddAsync(newProfile);
                await _dbContext.SaveChangesAsync();
                Debug.WriteLine(string.Format("ProfileID: {0}", newProfile.Id));

                // TODO: Update current user's ProfileID
            } else {
                // Update exists profile
                var profile = await _dbContext.Profiles.SingleOrDefaultAsync(m => m.Id == currentUser.ProfileID);

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
    }
}
