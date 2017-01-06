# CoreCRM 开发实录 —— Profile

再简单的功能，也需要一坨代码的支持。Profile 的编辑功能主要就是修改个人的信息。比如用户名、头像、性别、电话……虽然只是一个编辑界面，但添加下来，涉及了6个文件的修改和7个新创建的文件。各种生成的和手写的代码，共有934行之多。

## 1. Account 和 Profile 分离

什么是 Account？通常这个词被翻译成“帐户”。我的理解是，这个 Model 里的内容，是为了登录而设计的。而 Profile 呢，应该保存那些和登录无关的附加信息，比如昵称、头像之类的。不过，有一点坑的是，ASP.NET Core 默认的那个 Identify 服务把电话号码也做为 Account 的一部分，但没有提供通过电话来查找一个 User 的方法。虽然可以通过写一个 Extension 来实现这个功能，暂时先放在一边，有需求再说。

在原来的“悟空CRM”中，所有的信息都是放在 user 这个表里的。对于 CRM 这个应用，也不是一个大的问题。但我认为还是应该把 Profile 和 Account 分开。这样，在登录及验证用户权限的时候，就不需要去访问不相关的 Profile 里的内容。也许有朋友会说：我通过 SELECT 那些我需要的列，不也一样可以实现这个结果吗？但实际上，一个 Row 的内容，都是保存在一起的。只是数据库帮你过滤出来那些需要的信息。但在读取的时候，还是要去访问一整个 Row 的内容。如果分开当然就完全不需要访问了（虽然还有个 ID 在那里，但一个 ID 最多才4个字节）。

## 2. Repository

Repository 模式其实算是对一些使用 Plain Object 做 ORM 的系统的补充。按照 MVC 的实践准则，业务逻辑应该是写在 Model 这一层的。但为了保持 Model 是一个 Plain Object，只能再引入一层抽象，用来嫁接 Controller 和底层的 Model。当然，使用 Repository 还有另外一个好处，就是把数据库隔离开了。这样，对于 Controller 的单元测试就方便多了。否则，对 Controller 里一些逻辑的测试，还需要配置数据库。不过，有得就一定会有失。这里虽然测试 Controller 方便了，确还得对 Repository 本身时行测试。比较幸运的是，Entity Framework Core 提供了一个 InMemory 的数据库，专门用来测试对数据库的访问。

通常 Repository 会包含以下这些方法：

    IEnumerable<Model> GetInstances();
    Model GetModelByID(int ID);
    void InsertModel(Model model);
    void DeleteModel(int ID);
    void UpdateModel(Model model);
    void Save();

当然，对于具体的某个哪个 Model，这个列表也可以做一些修改。比如对于 Profile 这个 Model，我只使用了：

    Task<Profile> GetCurrentUserProfileAsync(ClaimsPrincipal userClaimsPrincipal);
    Task<ProfileViewModel> GetCurrentUserProfileViewModelAsync(ClaimsPrincipal userClaimsPrincipal);
    Task UpdateProfileAsync(ClaimsPrincipal userClaimsPrincipal, ProfileViewModel model);

感觉上，这三个函数应该做一些修改。因为这个页面不只可以编辑自己的资料，也可以让管理员改任何人的资料。如果是这样，`GetCurrentUserProfileAsync` 这个函数就应该改成 `GetUserProfileAsync`，可以加一个参数：`userId`。如果 `userId` 是 `null` 的话，就需要获取当前的用户的 `Profile`，如果有 `userId`, 那就去获取对应用户的 `Profile`。

[MSDN](https://www.asp.net/mvc/overview/older-versions/getting-started-with-ef-5-using-mvc-4/implementing-the-repository-and-unit-of-work-patterns-in-an-asp-net-mvc-application) 上有一篇关于 Repository 模式的说明。写的比较细。园子里的[这篇](http://www.cnblogs.com/carysun/archive/2009/03/20/Repository.html)也写的不错。

## 3. Interface

C# 里通常都是面向 interface 来写程序的。一开始我不是很适应这种模式，因为同一个类，还需要再写一个 interface，等于要把所有的函数签名再抄一遍。如果要修改，也是需要两处都改。保如果把测试考虑进去的话，就不一样了。如果是对一个类产生依赖，那么注入的时候，就需要对这个类进行 mock。如果这个类还有依赖，那整个就悲剧了。如果是使用 interface，这个问题就不存在了。

其实 interface 和 C 语言的 header file 很像。都是定义了函数的签名，然后在另一个地方来实现这个函数的功能。到了 C# 里，为什么这种分享确成了一种负担呢？只是这里有一个问题：interface 是这种侵入式的语言特性。也就是说：一个类必需要继承了对应的 interface 才可以做为这个 interface 的实例来使用。如果想对一个没有修改方法（比如一个 NuGet 包）想添加 interface 的话，就需要一个中间的 Adaptor 来转换。

## 4. MaxLength & StringLength

EF Core 的 Model 可以通过 Attribute 来指定一个字段的长度。同时，在 ViewModel 里，还可以指定 UI 层的验证。这时候就有两个东东出来了：StringLength 和 MaxLength。其中 MaxLength 是用来指定 EF 里面一个 string 字段的最多可以写多少个字符，也就是：`varchar(n)` 里的 n。而 StringLength 则是用来指定 ViewModel 里的验证长度的。

## 下一步

下一步，我要给 `ProfileController` 增加单元测试，把一些逻辑从 Repository 里弄出来，让 Repository 里尽量少的包含逻辑代码。这样，因为是直通底层，只需要最后做集成测试就可以了，就不需要做单元测试了。