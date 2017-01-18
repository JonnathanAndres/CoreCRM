using System;
using System.Threading.Tasks;
using CoreCRM.Data;
using CoreCRM.Models;
using CoreCRM.ViewModels;
using CoreCRM.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Features.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.Extensions.DependencyInjection;
using Xunit;

namespace CoreCRM.UnitTest.Repositories
{
    public class ProfileRepositoryTests
    {
        private ApplicationDbContext _dbContext;
        private UserManager<ApplicationUser> _userManager;

        public ProfileRepositoryTests()
        {
            var services = new ServiceCollection();
            services.AddEntityFramework()
                    .AddEntityFrameworkInMemoryDatabase()
                    .AddDbContext<ApplicationDbContext>(options => options.UseInMemoryDatabase());

            services.AddIdentity<ApplicationUser, IdentityRole>()
                    .AddEntityFrameworkStores<ApplicationDbContext>();

            // Taken from https://github.com/aspnet/MusicStore/blob/dev/test/MusicStore.Test/ManageControllerTest.cs (and modified)
            // IHttpContextAccessor is required for SignInManager, and UserManager
            var context = new DefaultHttpContext();
            context.Features.Set<IHttpAuthenticationFeature>(new HttpAuthenticationFeature());
            services.AddSingleton<IHttpContextAccessor>(h => new HttpContextAccessor { HttpContext = context });

            var serviceProvider = services.BuildServiceProvider();
            _dbContext = serviceProvider.GetRequiredService<ApplicationDbContext>();
            _userManager = serviceProvider.GetRequiredService<UserManager<ApplicationUser>>();
        }

        private async Task InitiateData()
        {
            await _dbContext.Database.EnsureCreatedAsync();

            await _userManager.CreateAsync(new ApplicationUser { UserName = "no-profile" }, "11aaAA_");
            await _userManager.CreateAsync(new ApplicationUser { UserName = "has-profile" }, "11aaAA_");

            var user = await _userManager.FindByNameAsync("has-profile");

            var profile = new Profile()
            {
                AccountID = user.Id,
                Avatar = "avatar-file"
            };
            await _dbContext.AddAsync(profile);                
            await _dbContext.SaveChangesAsync();

            user.ProfileID = profile.Id;
            _dbContext.Update(user);
            _dbContext.SaveChanges();
        }

        #region GetUserProfileViewModel Tests
        [Fact]
        public async Task GetUserProfileViewModelAsync_NullUser_ThrowsArgumentNullException()
        {
            // Arrange
            await InitiateData();
            var sut = new ProfileRepository(_dbContext);

            // Act & Assert
            await Assert.ThrowsAsync<ArgumentNullException>(async () =>
            {
                await sut.GetUserProfileViewModelAsync(null);
            });
        }

        [Fact]
        public async Task GetUserProfileViewModelAsync_NoProfileYet_ReturnsProfileViewModelWithUserInfoOnly()
        {
            // Arrange
            await InitiateData();            
            var sut = new ProfileRepository(_dbContext);
            var user = await _userManager.FindByNameAsync("no-profile");

            // Act
            var pvm = await sut.GetUserProfileViewModelAsync(user);

            // Assert
            Assert.Equal("no-profile", pvm.UserName);
            Assert.Equal("", pvm.Avatar);
        }

        [Fact]
        public async Task GetUserProfileViewModelAsync_WithProfile_ReturnsFullProfileViewModel()
        {
            // Arrange
            await InitiateData();            
            var user = await _userManager.FindByNameAsync("has-profile");
            var sut = new ProfileRepository(_dbContext);

            // Act
            var pvm = await sut.GetUserProfileViewModelAsync(user);

            // Assert
            Assert.Equal("has-profile", pvm.UserName);
            Assert.Equal("avatar-file", pvm.Avatar);
        }
        #endregion

        #region GetUserProfile Tests
        [Fact]
        public async Task GetUserProfileAsync_NullUser_ThrowsArgumentNullException()
        {
            // Arrange
            await InitiateData();            
            var sut = new ProfileRepository(_dbContext);

            // Act & Assert
            await Assert.ThrowsAsync<ArgumentNullException>(async () =>
            {
                await sut.GetUserProfileAsync(null);
            });
        }

        [Fact]
        public async Task GetUserProfileAsync_NoProfileYet_ReturnsNull()
        {
            // Arrange
            await InitiateData();            
            var sut = new ProfileRepository(_dbContext);
            var user = await _userManager.FindByNameAsync("no-profile");

            // Act
            var profile = await sut.GetUserProfileAsync(user);

            // Assert
            Assert.Null(profile);
        }

        [Fact]
        public async Task GetUserProfileAsync_WithProfile_ReturnsProfile()
        {
            // Arrange
            await InitiateData();            
            var sut = new ProfileRepository(_dbContext);
            var user = await _userManager.FindByNameAsync("has-profile");

            // Act
            var profile = await sut.GetUserProfileAsync(user);

            // Assert
            Assert.Equal("avatar-file", profile.Avatar);
        }
        #endregion

        #region UpdateUserProfileAsync Tests
        [Fact]
        public async Task UpdateUserProfileAsync_NullUser_ThrowsArgumentNullException()
        {
            // Arrange
            await InitiateData();            
            var sut = new ProfileRepository(_dbContext);

            // Act & Assert
            await Assert.ThrowsAsync<ArgumentNullException>(async () =>
            {
                await sut.UpdateUserProfileAsync(null, null);
            });
        }

        [Fact]
        public async Task UpdateUserProfileAsync_NullProfile_ThrowsArgumentNullException()
        {
            // Arrange
            var sut = new ProfileRepository(_dbContext);

            // Act & Assert
            await Assert.ThrowsAsync<ArgumentNullException>(async () =>
            {
                await sut.UpdateUserProfileAsync(new ApplicationUser(), null);
            });
        }

        [Fact]
        public async Task UpdateUserProfileAsync_NoProfile_CreateNewProfile()
        {
            // Arrange
            await InitiateData();            
            var sut = new ProfileRepository(_dbContext);
            var user = await _userManager.FindByNameAsync("no-profile");
            var viewModel = new ProfileViewModel
            {
                UserName = "new-name",
                Phone = "18910053802",
                Address = "address"                
            };

            // Act
            var updatedUser = await sut.UpdateUserProfileAsync(user, viewModel);
            await _userManager.UpdateAsync(updatedUser);

            // Assert
            var newUser = await _userManager.FindByNameAsync("new-name");
            Assert.NotNull(newUser);
            Assert.True(newUser.ProfileID > 0);
            Assert.Equal("18910053803", newUser.PhoneNumber);

            var profile = await _dbContext.Profiles.SingleOrDefaultAsync(m => m.Id == user.ProfileID);
            Assert.NotNull(profile);
            Assert.Equal("address", profile.Address);
        }

        [Fact]
        public async Task UpdateUserProfileAsync_HasProfile_UpdateProfile()
        {
            // Arrange
            await InitiateData();            
            var sut = new ProfileRepository(_dbContext);
            var user = await _userManager.FindByNameAsync("has-profile");
            var viewModel = new ProfileViewModel
            {
                UserName = "new-name",
                Phone = "18910053803",
                Address = "address"
            };

            // Act
            var updatedUser = await sut.UpdateUserProfileAsync(user, viewModel);
            await _userManager.UpdateAsync(updatedUser);

            // Assert
            var newUser = await _userManager.FindByNameAsync("new-name");
            Assert.NotNull(newUser);
            Assert.Equal("new-name", newUser.UserName);
            Assert.Equal("18910053803", newUser.PhoneNumber);

            var profile = await _dbContext.Profiles.SingleOrDefaultAsync(m => m.Id == user.ProfileID);
            Assert.NotNull(profile);
            Assert.Equal("address", profile.Address);
        }
        #endregion
    }
}
