using System;
using System.Threading.Tasks;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Microsoft.EntityFrameworkCore;

using CoreCRM.Data;
using CoreCRM.Repositories;
using CoreCRM.Models;
using CoreCRM.ViewModels;

namespace UnitTests.Repositories
{
    [TestClass]
    public class ProfileRepositoryTests
    {
        private static DbContextOptions<ApplicationDbContext> GetDbContextOptions(string databaseName)
        {
            return new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase(databaseName: databaseName)
                .Options;
        }

        #region GetUserProfileViewModel Tests
        [TestMethod]
        public async Task GetUserProfileViewModelAsync_NullUser_ThrowsArgumentNullException()
        {
            // Arrange
            DbContextOptions<ApplicationDbContext> options = GetDbContextOptions("GetUserProfileViewModelAsync_NullUser");

            using (var dbContext = new ApplicationDbContext(options))
            {
                var sut = new ProfileRepository(dbContext);

                // Act & Assert
                await Assert.ThrowsExceptionAsync<ArgumentNullException>(async () =>
                {
                    await sut.GetUserProfileViewModelAsync(null);
                });
            }
        }

        [TestMethod]
        public async Task GetUserProfileViewModelAsync_NoProfileYet_ReturnsProfileViewModelWithUserInfoOnly()
        {
            // Arrange
            DbContextOptions<ApplicationDbContext> options = GetDbContextOptions("GetUserProfileViewModelAsync_NoProfileYet");

            using (var dbContext = new ApplicationDbContext(options))
            {
                var sut = new ProfileRepository(dbContext);
                var user = new ApplicationUser()
                {
                    ProfileID = 0,
                    UserName = "no-profile"
                };

                // Act
                var pvm = await sut.GetUserProfileViewModelAsync(user);

                // Assert
                Assert.AreEqual("no-profile", pvm.UserName);
            }
        }

        [TestMethod]
        public async Task GetUserProfileViewModelAsync_WithProfile_ReturnsFullProfileViewModel()
        {
            // Arrange
            DbContextOptions<ApplicationDbContext> options = GetDbContextOptions("GetUserProfileViewModelAsync_WithProfile");

            using (var dbContext = new ApplicationDbContext(options))
            {
                var profile = new Profile()
                {
                    Avatar = "avatar-file"
                };
                dbContext.Profiles.Add(profile);

                var user = new ApplicationUser()
                {
                    ProfileID = profile.Id,
                    UserName = "with-profile"
                };
                dbContext.Users.Add(user);
                dbContext.SaveChanges();

                var sut = new ProfileRepository(dbContext);

                // Act
                var pvm = await sut.GetUserProfileViewModelAsync(user);

                // Assert
                Assert.AreEqual("with-profile", pvm.UserName);
                Assert.AreEqual("avatar-file", pvm.Avatar);
            }
        }
        #endregion

        #region GetUserProfile Tests
        [TestMethod]
        public async Task GetUserProfileAsync_NullUser_ThrowsArgumentNullException()
        {
            // Arrange
            DbContextOptions<ApplicationDbContext> options = GetDbContextOptions("GetUserProfileAsync_NullUser");

            using (var dbContext = new ApplicationDbContext(options))
            {
                var sut = new ProfileRepository(dbContext);

                // Act & Assert
                await Assert.ThrowsExceptionAsync<ArgumentNullException>(async () =>
                {
                    await sut.GetUserProfileAsync(null);
                });
            }
        }

        [TestMethod]
        public async Task GetUserProfileAsync_NoProfileYet_ReturnsNull()
        {
            // Arrange
            DbContextOptions<ApplicationDbContext> options = GetDbContextOptions("GetUserProfileAsync_NoProfileYet");

            using (var dbContext = new ApplicationDbContext(options))
            {
                var user = new ApplicationUser()
                {
                    ProfileID = 0,
                    UserName = "no-profile"
                };
                var sut = new ProfileRepository(dbContext);

                // Act
                var profile = await sut.GetUserProfileAsync(user);

                // Assert
                Assert.IsNull(profile);
            }
        }

        [TestMethod]
        public async Task GetUserProfileAsync_WithProfile_ReturnsProfile()
        {
            // Arrange
            DbContextOptions<ApplicationDbContext> options = GetDbContextOptions("GetUserProfileAsync_WithProfile");

            using (var dbContext = new ApplicationDbContext(options))
            {
                var profile = new Profile()
                {
                    Avatar = "avatar-file"
                };
                dbContext.Profiles.Add(profile);

                var user = new ApplicationUser()
                {
                    ProfileID = profile.Id,
                    UserName = "has-profile"
                };
                dbContext.Users.Add(user);
                dbContext.SaveChanges();

                var sut = new ProfileRepository(dbContext);

                // Act
                var _profile = await sut.GetUserProfileAsync(user);

                // Assert
                Assert.AreEqual(profile.Avatar, _profile.Avatar);
            }
        }
        #endregion

        #region UpdateUserProfileAsync Tests
        [TestMethod]
        public async Task UpdateUserProfileAsync_NullUser_ThrowsArgumentNullException()
        {
            // Arrange
            DbContextOptions<ApplicationDbContext> options = GetDbContextOptions("UpdateUserProfileAsync_NullUser");

            using (var dbContext = new ApplicationDbContext(options))
            {
                var sut = new ProfileRepository(dbContext);

                // Act & Assert
                await Assert.ThrowsExceptionAsync<ArgumentNullException>(async () =>
                {
                    await sut.UpdateUserProfileAsync(null, null);
                });
            }
        }

        [TestMethod]
        public async Task UpdateUserProfileAsync_NullProfile_ThrowsArgumentNullException()
        {
            // Arrange
            DbContextOptions<ApplicationDbContext> options = GetDbContextOptions("UpdateUserProfileAsync_NullProfile");

            using (var dbContext = new ApplicationDbContext(options))
            {
                var sut = new ProfileRepository(dbContext);
                var user = new ApplicationUser();

                // Act & Assert
                await Assert.ThrowsExceptionAsync<ArgumentNullException>(async () =>
                {
                    await sut.UpdateUserProfileAsync(user, null);
                });
            }
        }

        [TestMethod]
        public async Task UpdateUserProfileAsync_NoProfile_CreateNewProfile()
        {
            // Arrange
            DbContextOptions<ApplicationDbContext> options = GetDbContextOptions("UpdateUserProfileAsync_NoProfile");

            using (var dbContext = new ApplicationDbContext(options))
            {
                var sut = new ProfileRepository(dbContext);
                var user = new ApplicationUser()
                {
                    UserName = "no-profile"
                };
                dbContext.Users.Add(user);

                var viewModel = new ProfileViewModel
                {
                    UserName = "new-name",
                    Address = "address"
                };

                // Act
                var updatedUser = await sut.UpdateUserProfileAsync(user, viewModel);

                // Assert
                Assert.IsNotNull(updatedUser);
                Assert.IsTrue(updatedUser.ProfileID > 0);

                var newProfile = await dbContext.Profiles.SingleOrDefaultAsync(m => m.Id == user.ProfileID);
                Assert.IsNotNull(newProfile);
                Assert.AreEqual("address", newProfile.Address);
            }
        }

        [TestMethod]
        public async Task UpdateUserProfileAsync_HasProfile_UpdateProfile()
        {
            // Arrange
            DbContextOptions<ApplicationDbContext> options = GetDbContextOptions("UpdateUserProfileAsync_HasProfile");

            using (var dbContext = new ApplicationDbContext(options))
            {
                var profile = new Profile()
                {
                    Avatar = "avatar-file"
                };
                dbContext.Profiles.Add(profile);

                var user = new ApplicationUser()
                {
                    UserName = "has-proflie",
                    ProfileID = profile.Id
                };
                dbContext.Profiles.Add(profile);
                dbContext.SaveChanges();

                var sut = new ProfileRepository(dbContext);

                var viewModel = new ProfileViewModel
                {
                    UserName = "new-name",
                    Address = "address"
                };

                // Act
                var updatedUser = await sut.UpdateUserProfileAsync(user, viewModel);

                // Assert
                Assert.AreEqual("new-name", updatedUser.UserName);

                var updatedProfile = await dbContext.Profiles.SingleOrDefaultAsync(m => m.Id == user.ProfileID);
                Assert.IsNotNull(updatedProfile);
                Assert.AreEqual("address", updatedProfile.Address);
            }
        }
        #endregion
    }
}
