using System;
using System.Threading.Tasks;
using CoreCRM.Models;
using CoreCRM.Services;
using CoreCRM.Controllers;
using CoreCRM.ViewModels.AccountViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Logging.Internal;
using Moq;
using Xunit;

namespace CoreCRM.UnitTest.Controllers
{
    public class AccountControllerTests : BaseTest
    {
        private Mock<UserManager<ApplicationUser>> _mockUserManager;
        private Mock<SignInManager<ApplicationUser>> _mockSignInManager;
        private Mock<IEmailSender> _mockEmailSender;
        private Mock<ISmsSender> _mockSmsSender;
        private Mock<ILogger> _mockLogger;
        private Mock<ILoggerFactory> _mockLoggerFactory;

        public AccountControllerTests()
        {
            _mockUserManager = MockUserManager<ApplicationUser>();
            _mockSignInManager = MockSignInManager<ApplicationUser>(_mockUserManager);            
            _mockEmailSender = new Mock<IEmailSender>();
            _mockSmsSender = new Mock<ISmsSender>();
            _mockLogger = new Mock<ILogger>();
            _mockLoggerFactory = new Mock<ILoggerFactory>();

            _mockLogger.Setup(m => m.Log(It.IsAny<LogLevel>(), It.IsAny<EventId>(), It.IsAny<FormattedLogValues>(), It.IsAny<Exception>(), It.IsAny<Func<object, Exception, string>>()));
            _mockLoggerFactory.Setup(m => m.CreateLogger(It.IsAny<string>())).Returns(_mockLogger.Object);
        }

        private AccountController NewController()
        {
            var controller = new AccountController(_mockUserManager.Object,
                                         _mockSignInManager.Object,
                                         _mockEmailSender.Object,
                                         _mockSmsSender.Object,
                                         _mockLoggerFactory.Object);
            var mockUrlHelper = new Mock<IUrlHelper>();
            mockUrlHelper.Setup(m => m.IsLocalUrl(It.IsAny<string>())).Returns(true);
            controller.Url = mockUrlHelper.Object;
            return controller;
        }

        [Fact]
        public async Task Login_GivenInvalidModel_ReturnsViewResult()
        {
            // Arrange            
            var sut = NewController();
            sut.ModelState.AddModelError("Account", "Required");
            var newLoginViewModel = new LoginViewModel();

            // Act
            var result = await sut.Login(newLoginViewModel);

            // Assert
            var viewResult = Assert.IsType<ViewResult>(result);
            Assert.Equal(ModelValidationState.Invalid, viewResult.ViewData.ModelState.GetFieldValidationState("Account"));            
        }

        [Fact]
        public async Task Login_GivenNotExistsUser_ReturnsViewResult()
        {
            // Arrange
            _mockUserManager.Setup(m => m.FindByNameAsync(It.IsAny<string>())).Returns(Task.FromResult((ApplicationUser)null));
            _mockUserManager.Setup(m => m.FindByEmailAsync(It.IsAny<string>())).Returns(Task.FromResult((ApplicationUser)null));

            var sut = NewController();
            var newLoginViewModel = new LoginViewModel();

            // Act
            var result = await sut.Login(newLoginViewModel, "/");

            // Assert
            var viewResult = Assert.IsType<ViewResult>(result);
            Assert.Equal(1, viewResult.ViewData.ModelState.ErrorCount);
        }

        [Fact]
        public async Task Login_GivenUserName_ReturnsRedirectResult()
        {
            // Arrange
            _mockUserManager.Setup(m => m.FindByNameAsync(It.IsAny<string>())).Returns(Task.FromResult(new ApplicationUser()));
            _mockSignInManager.Setup(m => m.PasswordSignInAsync(It.IsAny<ApplicationUser>(), It.IsAny<string>(), It.IsAny<bool>(), It.IsAny<bool>()))
                                           .Returns(Task.FromResult(Microsoft.AspNetCore.Identity.SignInResult.Success));

            var sut = NewController();
            var newLoginViewModel = new LoginViewModel();

            // Act
            var result = await sut.Login(newLoginViewModel, "/");

            // Assert
            var redirectResult = Assert.IsType<RedirectResult>(result);
        }

        [Fact]
        public async Task Login_GivenUserEmail_ReturnsRedirectResult()
        {
            // Arrange
            _mockUserManager.Setup(m => m.FindByNameAsync(It.IsAny<string>())).Returns(Task.FromResult((ApplicationUser)null));
            _mockUserManager.Setup(m => m.FindByEmailAsync(It.IsAny<string>())).Returns(Task.FromResult(new ApplicationUser()));
            _mockSignInManager.Setup(m => m.PasswordSignInAsync(It.IsAny<ApplicationUser>(), It.IsAny<string>(), It.IsAny<bool>(), It.IsAny<bool>()))
                                           .Returns(Task.FromResult(Microsoft.AspNetCore.Identity.SignInResult.Success));

            var sut = NewController();
            var newLoginViewModel = new LoginViewModel();

            // Act
            var result = await sut.Login(newLoginViewModel, "/");

            // Assert
            var redirectResult = Assert.IsType<RedirectResult>(result);
        }
    }
}