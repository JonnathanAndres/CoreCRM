# Travis-CI 实现 .NET Core 程度在 macOS 上的构建和测试

上一篇文章我提到：为了使用“国货”，我把 Linux 上的构建和测试委托给了 DaoCloud，而 Travis-CI 不能放着不用啊。还好，这货支持 macOS 系统。所以就把 CoreCRM 在 macOS 上的构建和测试任务交给它了。

我想国内已经有很多写怎么用 Travis-CI 的博客文章了，我就不需要在这里多费话了。当然，最好的文章其实就是 Travis-CI 的文档；最好的帮助都在 StackOverflow 和 GitHub 上。如果还觉得自己英语不够用，看不懂这些站的话，我觉得只有两条路可以选：1. 学好英语；2. 放弃做程序员。

这里我要记录的是，使用 Travis-CI 构建 CoreCRM 时遇到的两个问题。在我解决这两个问题的过程中，我发现在这是两个非常普遍的问题，基本上在现在的 .NET Core 版本下 （Microsoft.NETCore.App 1.1.0），是两个肯定会遇到的问题。我在综合了好多的 GitHub issue 之后，用了 10 个 commit 才把这两个问题解决了。

## 1. OpenSSL 没有安装

首先遇到的问题是，在执行 `dotnet restore` 的时候，出现下面的异常：

    Unhandled Exception: System.TypeInitializationException: The type initializer for 'Crypto' threw an exception. ---> System.TypeInitializationException: The type initializer for 'CryptoInitializer' threw an exception. ---> System.DllNotFoundException: Unable to load DLL 'System.Security.Cryptography.Native': The specified module could not be found.
        (Exception from HRESULT: 0x8007007E)
            at Interop.CryptoInitializer.EnsureOpenSslInitialized()
            at Interop.CryptoInitializer..cctor()
            --- End of inner exception stack trace ---
            at Interop.Crypto..cctor()
            --- End of inner exception stack trace ---
            at Interop.Crypto.GetRandomBytes(Byte* buf, Int32 num)
            at System.IO.Path.GetCryptoRandomBytes(Byte* bytes, Int32 byteCount)
            at System.IO.Path.GetRandomFileName()
            at Microsoft.DotNet.InternalAbstractions.TemporaryDirectory..ctor()
            at Microsoft.Extensions.EnvironmentAbstractions.DirectoryWrapper.CreateTemporaryDirectory()
            at Microsoft.DotNet.Configurer.NuGetPackagesArchiver..ctor()
            at Microsoft.DotNet.Cli.Program.ConfigureDotNetForFirstTimeUse(INuGetCacheSentinel nugetCacheSentinel)
            at Microsoft.DotNet.Cli.Program.ProcessArgs(String[] args, ITelemetry telemetryClient)
            at Microsoft.DotNet.Cli.Program.Main(String[] args)
    /Users/travis/build.sh: line 57:  5310 Abort trap: 6           dotnet restore CoreCRM

这个问题是由于 `openssl` 的 `libssl` 这个动态库没有正确安装造成的。在 Travis-CI 的环境里，支持使用 Homebrew 来安装缺少的组件，但是有一个问题，就是 `openssl` 需要手动 `link` 到 `/usr/local/lib/` 里才能使用。我最开始使用 Homebrew 提供的 `link` 功能，也没有解决这个问题，只能自己使用 `ln` 来解决：

    before_install:
        - brew install openssl
        - ln -s /usr/local/opt/openssl/lib/libcrypto.1.0.0.dylib /usr/local/lib/
        - ln -s /usr/local/opt/openssl/lib/libssl.1.0.0.dylib /usr/local/lib/

把上面的 `before_install` 加到对应的位置，就可以解决上面这个问题了。（解决这个问题花了了大概 3 个小时的时间）

## 2. 打开文件太多

每种系统为了性能和安全的考虑，对一个进程能打开的文件数都做了限制。不过 macOS 的限制好像是特别的严格。在完成上而 restore 的过程这后，本来是要执行 test 的。结果确遇到下面的错误：

    xUnit.net .NET CLI test runner (64-bit .NET Core osx.10.12-x64)
    Unhandled Exception: System.IO.IOException: Too many open files
        at Interop.ThrowExceptionForIoErrno(ErrorInfo errorInfo, String path, Boolean isDirectory, Func`2 errorRewriter)
        at Interop.CheckIo[TSafeHandle](TSafeHandle handle, String path, Boolean isDirectory, Func`2 errorRewriter)
        at Microsoft.Win32.SafeHandles.SafeFileHandle.Open(Func`1 fdFunc)
        at System.ConsolePal.OpenStandardOutput()
        at Xunit.Runner.DotNet.Program.UseTestSinksWithStandardOutputStreams()
        at Xunit.Runner.DotNet.Program.Run(String[] args)
        at Xunit.Runner.DotNet.Program.Main(String[] args)
    SUMMARY: Total: 1 targets, Passed: 0, Failed: 1.

一开始找到的一些解决方案，可能是时间上有点久，针对的都是 Mono 下的一些方法，尝试这后都不管用。在进一步查找之后，找到了在 StackExchange 上的一个解决方案，就是增加允许打开的文件数：

    script:
        - ulimit -n 2048
        - dotnet test CoreCRM.IntegrationTest

这样，上面打开文件太多的问题就可以解决了。

完整的 .travis.yml 请到我的 GitHub 或者 Coding.NET 里查看。在我写完这篇文章的时候，三个 CI 平台，还只有 Travis-CI 是使用版本库里的配置文件完成配置的。后面我会把 AppVeyor 和 DaoCloud 的配置文件下载下来，放到版本库里，这样大家就可以使用这些样板实现自己的 CI 流程了。不过，现在这个时候，我还没有把测试做到极致，还只是能看到全部测试是成功还是失败。随着后面的开发，我会让测试的结束更详细一些，以方便在线看到是哪些测试出了问题。

GitHub: https://github.com/holmescn/CoreCRM
Coding.NET: https://coding.net/u/holmescn/p/CoreCRM/git