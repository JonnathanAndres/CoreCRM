虽然2月初就回来了，可 CoreCRM 一直到5月才开始恢复开发，期间是各种生活中的意外和不方便。

## 1. 为什么要重构

首先是一件很值得高兴的事情：CoreCRM 有了第一位 contributor！[Larry](https://github.com/larry011) 是我原来的一位
实习生，现在在某公司做前端开发。因为 Larry 的加入，我就不再是一个人战斗了。当然，也就得考虑怎么进行合作的事情了。

年前的开发计划是：使用 Bootstrap 按照悟空CRM的样子先弄出一个可以用的版本来。然后再使用一些比较好的后台前端框架来代替 Bootstrap。
在和 Larry 讨论之后，他觉得 Bootstrap 已经有点跟不上时代，以后扩展 UI 都会有一些困难。加上 Bootstrap 是使用 jQuery 作为
交互基础的，和 VueJS 这样的框架也是不太配合。**正好** Larry 的公司正在使用蚂蚁金服出品的 Ant Design 开发后台程序，他感觉这个框架
设计的不错：组件丰富、设计合理、社区活跃、文档丰富（还是中文）。Ant Design 基于 React Component，也是当前非常流行的前端
框架，经过多年的发展，据说其组件的丰富程度已经与 jQuery 不遑多让。

鉴于之前我使用 VueJS 做全页渲染的经验，我认为 React 这东西，如果不做 Server-Side Rendering（SSR），用户体验不会太好。
如何集成 SSR，其实有两种方案：

1. 完全使用 nodejs 来做前端服务器，ASP.NET Core 做 API 服务器
2. 集成 node 到 ASP.NET Core 里，通过 ASP.NET Core 提供一些 Web 的服务

去年我也曾经用了一周的时间去研究几个 ASP.NET Core 的 React Server-side Rendering 方案，可一个人的精力毕竟有限，
要同时使用两种语言开发，脑子的转换效率是一个问题。最后我放弃了 React，转而使用 ASP.NET Core 的 Razor 来做页面渲染了。
只对其中一些动态的部分做了 VueJS 组件。不过这次情况不一样了，有 Larry 做前端的开发，我可以把更多的精力放到后面的
API 开发和架构的优化上。而且，前后分离之后，还可以在对方工作滞后的情况下继续开发。所以我决定对整个项目进行重构。

## 2. 重构的尝试

近些年前端技术发展迅速，各种 hot reload 横行，在开发的时候要方便和高效的多。那么应该怎么来实现 SSR 呢？我进行了三次尝试：

### 2.1 Microsoft.AspNetCore.SpaServices

做为 ASP.NET Core 团队的作品，感觉上是比 Facebook 做的 ReactJS.NET 更好用一些。特别是和 ASP.NET Core 的互通性上，
应该有一些优势。不过，ReactJS.NET 的 SSR 已经内置，写起来要容易一些。

一开始，我尝试使用 aspnetcore-spa 这个 yeoman generator，可这货居然还是使用的 typescript 做为主语言。虽然我之前
也学了一点 typescript，但与别人合作的时候，就不能只考虑自己的技术栈了。为了不增加 Larry 的学习成本，以使得项目能够
尽快进入开发，我决定还是自己搞一个基于 es6 的 ClientApp。方法当然也很简单：用 dva-cli 创建一下就 OK 了。

在完成了 ClientApp 的创建之后，需要添加一个 boot-server.js 来实现 SSR：

    var { match } = require('react-router');
    var { createServerRenderer } = require('aspnet-prerendering');

    module.exports = createServerRenderer(function(params) {
        return new Promise(function (resolve, reject) {
            var re = /^\/([^\/]*)(/[^\/]*)?/;
            var matched = params.location.path.match(re);
            var controller = matched[1];
            var codeFile = './dist/' + controller;
            var App = require(codeFile); // eslint-disable-line

            var path = matched[2] === '' ? '/' : matched[2]; // this line is buggy.
            match({
                routes: App.routes,
                location: path
            }, function (err, redirectLocation, renderProps) {
                if (err) throw new Error("Route match failed: " + err);

                if (redirectLocation) new Error("I don't know how to redirect.");

                var initialState = {};
                resolve({ html: App.renderHTML(initialState, renderProps)});
            })
        });
    });

`params` 里包含了一些从 Razor 传进来的数据，比如访问的路由、初始化数据等。这里本来应该直接使用 `params.location.path`
来匹配路由，进行渲染的，可是我并没有使用完全的 SPA (Single Page Application) 架构，而是有所分离，所以就需要使用正则表达式
分离 controller 和 action，然后再进行页内的匹配。现在 repo 里的代码只是实现了单页的测试载入，还没有正式的使用起来。

### 2.2 koa + Web API Server

本来以为上面这个方案就已经可以了。前端使用了 dva + antd + roadhog，可以直接运行一个 webpack-dev-server 直接进行开发。
然后我再转到 Razor 里做为一个 Controller 的 View。不过，Larry 希望能完全脱离 ASP.NET Core 运行前端代码。我也
考虑了使用 SpaServices 可能会有一些限制，比如：需要处理路由、不能使用 ES6，同时运行的时候也还是需要安装 Node，其实和一个独立
的前端 Server 并没有什么区别。所以我又尝试把前端的 Server 完全分离出来。

这一步可能做的有点太激进了，我尝试使用 Web API 的模板重新创建了 CoreCRM 这个 project。结果就悲剧了：Web API 是非常轻量的
框架，里面什么也没有。加上如果要分离前后端 Server，比较好的权限验证方案是使用 JSON-Web-Token，不然还需要在两个 Server 之前
同步 session，也是比较麻烦的事情。而搞一套 JWT 的验证机制，也不是很容易。已经有的解决方案不是太简单，就是太复杂……

### 回归 SpaServices

上面这些困难加起来，让我觉得这里面的学习成本现在不可接受。所以就先放弃了这个方案。在经过一点设计和开发之后，我发现这其实和
使用 koa 并没有太大的差别。问题总是可以通过一些服务间的交互来解决的。只是现在这个节点，使用 SpaServices 更容易上手一点。
待到项目有一个可用的版本，后面可以尝试以其它的方式进行重构，也不是不可能的事情。毕竟这个项目至少还有2.0版。

## 3. 经验

“选择”总是一件很困难的事情。特别是每个选项都各有利弊的时候，选择就更加困难。每一种组合都是一种可能，每一种组合有都有它的
局限。差别可能就在团队成员之间是不是能顺畅的合作。如果合作出现问题，能不能及时调整。

希望这次调整能给项目带来更多的活力。