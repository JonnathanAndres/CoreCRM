using System;
using System.Threading.Tasks;
using CoreCRM.Data;
using CoreCRM.Models;
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

            Task.Run(async () => {
                await _userManager.CreateAsync(new ApplicationUser { UserName = "test1" }, "11aaAA_");
                await _userManager.CreateAsync(new ApplicationUser { UserName = "test2" }, "11aaAA_");

                var user = await _userManager.FindByNameAsync("test2");

                var profile = new Profile()
                {
                    AccountID = user.Id,
                    Avatar = "avatar-file"
                };
                _dbContext.Add(profile);                
                _dbContext.SaveChanges();

                user.ProfileID = profile.Id;
                _dbContext.Update(user);
                _dbContext.SaveChanges();
            }).Wait();
        }

        #region GetUserProfileViewModel Tests
        [Fact]
        public async Task GetUserProfileViewModelAsync_NullUser_ThrowsArgumentNullException()
        {
            // Arrange
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
            var sut = new ProfileRepository(_dbContext);
            var user = await _userManager.FindByNameAsync("test1");

            // Act
            var pvm = await sut.GetUserProfileViewModelAsync(user);

            // Assert
            Assert.Equal(pvm.UserName, "test1");
            Assert.Equal(pvm.Avatar, "");
        }

        [Fact]
        public async Task GetUserProfileViewModelAsync_WithProfile_ReturnsFullProfileViewModel()
        {
            // Arrange
            var user = await _userManager.FindByNameAsync("test2");
            var sut = new ProfileRepository(_dbContext);

            // Act
            var pvm = await sut.GetUserProfileViewModelAsync(user);

            // Assert
            Assert.Equal(pvm.UserName, "test2");
            Assert.Equal(pvm.Avatar, "avatar-file");
        }
        #endregion

        #region GetUserProfileRegion
        [Fact]
        public async Task GetUserProfileAsync_NullUser_ThrowsArgumentNullException()
        {
            // Arrange
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
            var sut = new ProfileRepository(_dbContext);
            var user = await _userManager.FindByNameAsync("test1");

            // Act
            var profile = await sut.GetUserProfileAsync(user);

            // Assert
            Assert.Null(profile);
        }

        [Fact]
        public async Task GetUserProfileAsync_WithProfile_ReturnsProfile()
        {
            // Arrange
            var sut = new ProfileRepository(_dbContext);
            var user = await _userManager.FindByNameAsync("test2");

            // Act
            var profile = await sut.GetUserProfileAsync(user);

            // Assert
            Assert.Equal(profile.Avatar, "avatar-file");
        }
        #endregion
    }
}
