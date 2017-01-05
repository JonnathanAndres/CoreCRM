# CoreCRM 开发实录 —— Profile

再简单的功能，也需要一坨代码的支持。Profile 的编辑功能主要就是修改个人的信息。比如用户名、头像、性别、电话……虽然只是一个编辑界面，但添加下来，涉及了6个文件和修改和7个新建立的文件。各种生成的和手写的代码，有934行之多。

## 1. Account 和 Profile 分离

什么是 Account？通常这个词被翻译成“帐户”。其实就是，这个 Model 里的内容，主要是为了登录而设计使用的。而 Profile 呢，应该放那些 和登录无关的附加信息，比如昵称、头像之类的。不过，有一点坑的是，ASP.NET Core 默认的那个 Identify 服务把电话号码也做为 Account 的一部分，但确没有通过电话来查找一个 User 的方法。当然，可以对过写一个 Extension 来实现这个功能，我暂时没有加上。

在原来的悟空CRM中，所有的信息都是放在 user 这个表里的。对于 CRM 这个应用，也不是一个大的问题。但我认为还是应该把 Profile 和 Account 分开。这样，在登录及验证用户权限的时候，就不需要去访问不相关的 Profile 里的内容。也许有朋友会说：我通过 SELECT 那些我需要的列，不也一样可以实现这个结果吗？但实际上，一个 Row 的内容，都是保存在一起的。只是数据库帮你过滤出来那些需要的信息。但在读取的时候，还是要去访问一整个 Row 的内容。如果分开当然就完全不需要访问了（虽然还有个 ID 在那里，但一个 ID 最多才4个字节）。

## 2. Repository

Repository 模式其实算是对一些使用 Plain Object 做 ORM 的系统的补充。按照 MVC 的实践准则，业务逻辑应该是写在 Model 这一层的。但为了操持 Model 是一个 Plain Object，只能再引入一层抽象，用来嫁接 Controller 和底层的 Model。当然，使用 Repository 还有另外一个好处，就是把数据库隔离开了。这样，对于 Controller 的单元测试就方便多了。否则，对 Controller 里一些逻辑的测试，还需要配置数据库。不过，有得就一定会有失。这里虽然测试 Controller 方便了，确还得对 Repository 本身时行测试。比较幸运的是，Entity Framework Core 提供了一个 InMemory 的数据库，专门用来测试对数据库的访问。

## 3. Interface

C# 里通常都是面向 interface 来写程序的。一开始我不是很适应这种模式，因为同一个类，还需要再写一个 interface，等于要把所有的函数签名再抄一遍。如果要修改，也是需要两处都

## 4. MaxLength & StringLength

