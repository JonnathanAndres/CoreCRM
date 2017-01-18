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
            if (user == null) throw new ArgumentNullException(nameof(user));            
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
            if (user == null) throw new ArgumentNullException(nameof(user));
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
            if (user == null) throw new ArgumentNullException(nameof(user));
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

        public async Task<ApplicationUser> UpdateUserProfileAsync(ApplicationUser user, ProfileViewModel model)
        {
            if (user == null) throw new ArgumentNullException(nameof(user));
            if (model == null) throw new ArgumentNullException(nameof(model));
            Contract.EndContractBlock();

            if (user.ProfileID == 0) {
                // Create a new profile
                var newProfile = new Profile {
                    AccountID = user.Id,
                    Gender = model.Gender,
                    Address = model.Address
                };

                if (model.AvatarFile != null) {
                    newProfile.Avatar = model.AvatarFile.FileName;
                }

                _dbContext.Profiles.Add(newProfile);
                await _dbContext.SaveChangesAsync();

                // Update user's ProfileID
                user.ProfileID = newProfile.Id;

            } else {
                // Update exists profile
                var profileToUpdate = await _dbContext.Profiles.SingleOrDefaultAsync(m => m.Id == user.ProfileID);

                profileToUpdate.Gender = model.Gender;
                profileToUpdate.Address = model.Address ?? profileToUpdate.Address;
                
                if (model.AvatarFile != null) {
                    profileToUpdate.Avatar = model.AvatarFile.FileName;
                }

                _dbContext.Update(profileToUpdate);
                await _dbContext.SaveChangesAsync();
            }

            // Update user
            user.Email = model.Email ?? user.Email;
            user.PhoneNumber = model.Phone ?? user.PhoneNumber;
            user.State = model.AccountState;
            user.UserName = model.UserName ?? user.UserName;

            return user;
        }
    }
}
