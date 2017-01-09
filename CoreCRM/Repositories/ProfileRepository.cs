using System;
using System.Diagnostics.Contracts;
using System.Threading.Tasks;
using CoreCRM.Data;
using CoreCRM.Models;
using CoreCRM.ViewModels;
using Microsoft.EntityFrameworkCore;

namespace CoreCRM.Repositories
{
    public class ProfileRepository : IProfileRepository
    {
        private ApplicationDbContext _dbContext;

        public ProfileRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Profile> GetUserProfileAsync(ApplicationUser user)
        {
            if (user == null) throw new ArgumentNullException("user");            
            Contract.Requires(user != null);

            if (user.ProfileID > 0) {
                await _dbContext.Users.Include(u => u.Profile).LoadAsync();
                return user.Profile;
            }
            else {
                return null;
            }
        }

        public async Task<ProfileViewModel> GetUserProfileViewModelAsync(ApplicationUser user)
        {
            if (user == null) throw new ArgumentNullException("user");
            Contract.EndContractBlock();

            if (user.ProfileID > 0) {
                await _dbContext.Users.Include(u => u.Profile).LoadAsync();
                return FillViewModel(user, user.Profile);
            }
            else {
                return FillViewModel(user, null);
            }
        }

        private static ProfileViewModel FillViewModel(ApplicationUser user, Profile profile)
        {
            if (user == null) throw new ArgumentNullException("user");
            Contract.EndContractBlock();

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

        public async Task UpdateUserProfileAsync(ApplicationUser user, ProfileViewModel model)
        {
            if (user == null) throw new ArgumentNullException("user");
            Contract.EndContractBlock();

            if (user.ProfileID == 0) {
                // Create a new profile
                var newProfile = new Profile() {
                    AccountID = user.Id,
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
    }
}
