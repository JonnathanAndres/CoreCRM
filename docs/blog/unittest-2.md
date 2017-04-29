# CoreCRM 开发实录 —— 单元测试之 Mock UserManager 和 SignInManager

单元测试的核心就是：只测试眼前的逻辑。这就要求所有的依赖项都要使用仿类来代替，也就是所谓的 Mock Object。在测试 `ProfileRepository` 和 `AccountController` 的时候，我遇到了需要对 `UserManager` 和 `SignInManager` 进行 Mock 的需求。因为这两个组件相互依赖，还依赖别的组件，我折腾了好一阵才搞定这个问题。具体的方法分两种：直接使用 Moq 进行 Mock 和使用 InMemory Database 进行 Mock。下面分别来说明一下。

## 一、 使用 InMemory Database 进行 Mock

在 `ProfileRepository` 的测试中，我使用了 InMemory 这个方案。因为之前对单元测试的一些误解（使用 PHPUnit 而遗留下来的想法），我最直接想到的就是在数据库中添加数据，然后让各个组件去直接读数据库。当然，为了让测试能够飞速运行，我需要使用一个在内存里运行的数据库。但严格来说，这样就不算是单元测试了，而有一些集成测试的味道。只是使用内存数据库，速度上并没有那么慢，所以权且当成是一种扩展版的单元测试吧。这里有两个内存数据库可以选：一个是 SQLite 的 `:memory:` 模式，这个是一个接近完整的数据库，只是在外键的约束上可能还有点问题；另一个是 EF Core 的 InMenory 数据库。这个只是一个内存里保存数据的容器，其实并不是一个数据库，没有 SQLite 那样的数据一致性检查。这里，我使用的是 InMemory Database，这样可以让这个测试更“单元”一点：

    public ProfileRepositoryTests()
    {
        var services = new ServiceCollection();
        services.AddEntityFramework()
                .AddEntityFrameworkInMemoryDatabase()
                .AddDbContext<ApplicationDbContext>(options => {
                    options.UseInMemoryDatabase();
                });

        services.AddIdentity<ApplicationUser, IdentityRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>();

        // Taken from https://github.com/aspnet/MusicStore/blob/dev/test/MusicStore.Test/ManageControllerTest.cs (and modified)
        // IHttpContextAccessor is required for SignInManager, and UserManager
        var context = new DefaultHttpContext();
        context.Features.Set<IHttpAuthenticationFeature>(
            new HttpAuthenticationFeature());
        services.AddSingleton<IHttpContextAccessor>(h => 
            new HttpContextAccessor { HttpContext = context });

        var serviceProvider = services.BuildServiceProvider();
        _dbContext = serviceProvider.GetRequiredService<ApplicationDbContext>();
        _userManager = serviceProvider.GetRequiredService<UserManager<ApplicationUser>>();

        Task.Run(async () => {
            await _userManager.CreateAsync(new ApplicationUser {
                UserName = "test1" }, "11aaAA_");
            await _userManager.CreateAsync(new ApplicationUser {
                UserName = "test2" }, "11aaAA_");

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

可以看到，其实就是把 Startup 里的一些内容复制过来而已。这里 `_userManager` 和 `_dbContext` 都是做为 TestClass 的成员而存在的。可以使用 Property，也可以使用成员变量。这样做的意义主要是一些测试可能需要再增加一些数据，歌者直接去 Assert 数据库里有对应的数据。当然，如果为了更灵活的测试，这里的添加数据的问题也可以提出去，做了一个单独的函数，然后在 Arrange 阶段来调用。怎么安排测试的结构，取决于测试的复杂度和个人的风格，没有太多的标准。

## 二、直接使用 Moq 来 Mock

在 Mock `AccountController` 里的 `UserManager` 时，我发现了另一个解决方案，相比上面的方案，这个更加直接一些：


    public static Mock<SignInManager<TUser>>
    MockSignInManager<TUser>(Mock<UserManager<TUser>> manager)
    where TUser : class
    {
        var context = new Mock<HttpContext>();
        // var manager = MockUserManager<TUser>();
        return new Mock<SignInManager<TUser>>(manager.Object,
            new HttpContextAccessor { HttpContext = context.Object },
            new Mock<IUserClaimsPrincipalFactory<TUser>>().Object,
            null, null)
        { CallBase = true };
    }

    public static Mock<UserManager<TUser>> MockUserManager<TUser>()
    where TUser : class
    {
        IList<IUserValidator<TUser>> UserValidators =
            new List<IUserValidator<TUser>>();
        IList<IPasswordValidator<TUser>> PasswordValidators =
            new List<IPasswordValidator<TUser>>();

        var store = new Mock<IUserStore<TUser>>();
        UserValidators.Add(new UserValidator<TUser>());
        PasswordValidators.Add(new PasswordValidator<TUser>());
        var mgr = new Mock<UserManager<TUser>>(store.Object, null, null,
            UserValidators, PasswordValidators, null, null, null, null);
        return mgr;
    }

使用这两个函数，就可以直接创建 `UserManager` 和 `SignInManager` 的 Mock 了。不过，在使用 `SignInManager` 模拟登录的时候还要注意：

    _mockSignInManager.Setup(m =>
        m.PasswordSignInAsync(It.IsAny<ApplicationUser>(),
                              It.IsAny<string>(),
                              It.IsAny<bool>(),
                              It.IsAny<bool>()))
        .Returns(Task.FromResult(SignInResult.Success));

也就是说，创建“登录成功”，不能直接 `new` 一个 `SignInResult`，因为不能修改 `SignInResult` 的状态，而是要使用它已经写好的带状态的结果。

这两种方式各有用处。比如 InMemory Database 的方案，不但可以对 `UserManager` 和 `SignInManager` 的结果进行控制，还提供了一个可以写入和检查的数据库。而直接 Mock 的方案，则干扰更少，更专注于逻辑。我个人感觉，在对 Repository 的测试中，使用 InMemory Database 可能更合适一点，然后在其它地方，因为 Repository 隔离了数据访问，所以可以直接对 Repository 进行 Mock，这时候就可以使用直接 Mock 的方案。

## 三、Logger 的 Mock

在测试 `AccountController` 的时候，还需要对 `ILogger` 和 `ILoggerFactory` 进行 Mock，这当然也不是什么难事：

    _mockLogger.Setup(m => m.Log(It.IsAny<LogLevel>(),
                                 It.IsAny<EventId>(),
                                 It.IsAny<FormattedLogValues>(),
                                 It.IsAny<Exception>(),
                                 It.IsAny<Func<object, Exception, string>>()));
    _mockLoggerFactory.Setup(m =>
        m.CreateLogger(It.IsAny<string>())).Returns(_mockLogger.Object);

也就是，得 Mock 两个东西。这当然是因为 `Controller` 里都是依赖于 `ILoggerFactory` ，然后再使用 `factory` 创建 `ILogger`。

## 四、UrlHelper 的 Mock

最后一个坑是 `UrlHelper`。通常一个 `Controller` 都会有 `RedirectTo` 一个 `Action` 或者一个 URL 的需求，那就不可避免要用到 `UrlHelper`。而 `Controller` 需要单独进行 Mock：

    var mockUrlHelper = new Mock<IUrlHelper>();
    mockUrlHelper.Setup(m => m.IsLocalUrl(It.IsAny<string>())).Returns(true);
    controller.Url = mockUrlHelper.Object;

下面参考资料里的代码要复杂的多，应该是因为 ASP.NET Core 的版本问题造成的。我这个“简单的版本”，是针对 1.1.0 版本的。如果以后有变化，可能会在别的地方再说明吧。

完整的代码请到下面两个 repo 中的一个去看：

GitHub: http://github.com/holmescn/CoreCRM
Codint.NET: https://coding.net/u/holmescn/p/CoreCRM/git

参考链接：
[直接 Mock 的代码是请看这里](https://github.com/aspnet/Identity/issues/640)
[使用 InMemory Database 的请看这里](http://stackoverflow.com/questions/34384549/how-to-mock-out-the-usermanager-in-asp-net-5)
[UrlHelper 的原始想法来自这里](http://stackoverflow.com/questions/674458/asp-net-mvc-unit-testing-controllers-that-use-urlhelper)