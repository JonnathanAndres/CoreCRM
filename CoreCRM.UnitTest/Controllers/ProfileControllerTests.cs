using System;
using System.Threading.Tasks;
using System.Security.Claims;
using CoreCRM.Models;
using CoreCRM.Controllers;
using CoreCRM.Repositories;
using CoreCRM.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Logging.Internal;
using Moq;
using Xunit;

namespace CoreCRM.UnitTest.Controllers
{
    public class ProfileControllerTests : BaseTest
    {
        private Mock<UserManager<ApplicationUser>> _mockUserManager;
        private Mock<IProfileRepository> _mockProfileRepository;
        private Mock<IHelpers> _mockHelpers;
        private Mock<ILogger> _mockLogger;
        private Mock<ILoggerFactory> _mockLoggerFactory;

        public ProfileControllerTests()
        {
            _mockUserManager = MockUserManager<ApplicationUser>();
            _mockProfileRepository = new Mock<IProfileRepository>();
            _mockHelpers = new Mock<IHelpers>();
            _mockLogger = new Mock<ILogger>();
            _mockLoggerFactory = new Mock<ILoggerFactory>();

            _mockLogger.Setup(m => m.Log(It.IsAny<LogLevel>(), It.IsAny<EventId>(), It.IsAny<FormattedLogValues>(), It.IsAny<Exception>(), It.IsAny<Func<object, Exception, string>>()));
            _mockLoggerFactory.Setup(m => m.CreateLogger(It.IsAny<string>())).Returns(_mockLogger.Object);

            _mockHelpers.Setup(m => m.GetReferer(It.IsAny<HttpContext>(), It.IsAny<string>())).Returns("");
        }

        private ProfileController NewController(ProfileViewModel viewModel, ApplicationUser user)
        {
            _mockUserManager.Setup(m => m.GetUserAsync(It.IsAny<ClaimsPrincipal>())).Returns(Task.FromResult(user));
            _mockProfileRepository.Setup(m => m.GetUserProfileViewModelAsync(It.IsAny<ApplicationUser>())).Returns(Task.FromResult(viewModel));
            _mockUserManager.Setup(m => m.FindByIdAsync(It.IsAny<string>())).Returns(Task.FromResult(user));
            _mockProfileRepository.Setup(m => m.UpdateUserProfileAsync(It.IsAny<ApplicationUser>(), It.IsAny<ProfileViewModel>())).Returns(Task.FromResult(user));

            var controller = new ProfileController(_mockUserManager.Object, _mockProfileRepository.Object, _mockHelpers.Object);
            controller.ControllerContext = new ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();

            return controller;
        }

        [Fact]
        public async Task Index_GivenEmptyId_ReturnsCurrentUserProfile()
        {
            // Arrange
            var viewModel = new ProfileViewModel
            {
                Email = "test@email.com"                
            };
            var controller = NewController(viewModel, null);

            // Act
            var result = await controller.Index(string.Empty);

            // Assert
            var viewResult = Assert.IsType<ViewResult>(result);
            Assert.Equal(viewModel, viewResult.ViewData.Model);
        }

        [Fact]
        public async Task Index_GivenNotExistsUserId_ReturnsNotFound()
        {
            // Arrange
            var viewModel = new ProfileViewModel
            {
                Email = "test@email.com"
            };
            var controller = NewController(viewModel, null);

            // Act
            var result = await controller.Index("not-found");

            // Assert
            var notFoundResult = Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        public async Task Index_GivenValidUserId_ReturnsViewResult()
        {
            // Arrange
            var viewModel = new ProfileViewModel
            {
                Email = "test@email.com"
            };
            var user = new ApplicationUser();
            var controller = NewController(viewModel, user);

            // Act
            var result = await controller.Index("a-user");

            // Assert
            var viewResult = Assert.IsType<ViewResult>(result);
            Assert.Equal(viewModel, viewResult.ViewData.Model);
        }

        [Fact]
        public async Task Index_GivenInvalidModel_ReturnsViewResultWithInvalidMessage()
        {
            // Arrange
            var viewModel = new ProfileViewModel
            {
                Email = "test@email.com"
            };
            var controller = NewController(viewModel, null);
            controller.ModelState.AddModelError(string.Empty, "invalid-message");

            // Act
            var result = await controller.Index(viewModel, null);

            // Assert
            var viewResult = Assert.IsType<ViewResult>(result);
            Assert.Equal(false, viewResult.ViewData.ModelState.IsValid);
        }

        [Fact]
        public async Task Index_GivenEmptyUserId_UpdateCurrentUserProfile()
        {
            // Arrange
            var viewModel = new ProfileViewModel
            {
                Email = "test@email.com"
            };
            var user = new ApplicationUser();
            var controller = NewController(viewModel, user);

            // Act
            var result = await controller.Index(viewModel, "");

            // Assert
            // Update user profile
            _mockProfileRepository.Verify(m => m.UpdateUserProfileAsync(user, viewModel), Times.Once());

            // Return Redirect
            var viewResult = Assert.IsType<ViewResult>(result);
        }

        [Fact]
        public async Task Index_GivenInvalidUserId_ReturnsNotFoundResult()
        {
            // Arrange
            var viewModel = new ProfileViewModel
            {
                Email = "test@email.com"
            };
            var controller = NewController(viewModel, null);

            // Act
            var result = await controller.Index(viewModel, "not-found-user");

            // Assert
            // Update user profile
            _mockProfileRepository.Verify(m => m.UpdateUserProfileAsync(It.IsAny<ApplicationUser>(), viewModel), Times.Never());

            // Return Redirect
            var notFoundResult = Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        public async Task Index_GivenValidUserId_UpdateUserProfile()
        {
            // Arrange
            var viewModel = new ProfileViewModel
            {
                Email = "test@email.com"
            };
            var user = new ApplicationUser();
            var controller = NewController(viewModel, user);

            // Act
            var result = await controller.Index(viewModel, "user-id");

            // Assert
            // Update user profile
            _mockProfileRepository.Verify(m => m.UpdateUserProfileAsync(user, viewModel), Times.Once());

            // Return Redirect
            var viewResult = Assert.IsType<ViewResult>(result);
        }
    }
}