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

            _userManager.CreateAsync(new ApplicationUser { UserName = "test" }, "passwd").Wait();
        }

        [Fact]
        public async Task GetUserProfileViewModelAsync_CurrentUser_CurrentUserProfile()
        {
            // Arrange
            var c = new ProfileRepository(_userManager, _dbContext);
            var userClaimsPrincipal = null;

            // Act
            var vm = await c.GetUserProfileViewModelAsync((string)null);

            // Assert
            Assert.Null(vm);
        } 
    }
}
