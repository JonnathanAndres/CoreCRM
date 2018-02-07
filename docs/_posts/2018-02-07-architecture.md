---
layout:      post
title:       CoreCRM 系统架构
abstract:    系统的架构设计
date:        2018-02-07
author:      Holmes Conan
category:    Architecture
---

# 总构架

新版本的 CoreCRM 使用了近似微服务的架构。将系统划分成以下几个部分：

- 前端 UI 服务
- IdentityServer
- API Gateway
- ServiceRunner
- Extensions
- 其它语言的服务

## 前端 UI 服务

在 UI 层使用 nuxt.js/next.js 做前端的应用服务器，以实现前后端分离的架构，降低前后端耦合，
并提高前端的可用性，和响应速度。因为系统最后是一个整体开源的项目，所以，使用两种前端 UI 架构，
有增加其他人协作的机会。如果使用 nuxt.js，则使用 nuxt.js + iview + iview-admin 这一套方案；
如果使用 next.js，则使用 next.js + ant design + antd-admin 的方案。因为 antd-admin
的页面完整度没有 iview-admin 高，所以我主要是使用 iview-admin 开发，然后基于 antd-admin
对 next.js 方案进行尝试性开发。

## IdentityServer

使用 IdentityServer4 做为系统的验证/授权服务，对外可直接访问。有独立的数据库保存用户验证数据。
如果支持，最好可以实现使用 cert 的登录方式，减少对密码的依赖。或者使用手机的二步验证登录。

## API Gateway

做为除 IdentityServer 以外，对外提供服务的入口，隐藏了内部服务的细节。目前的方案是使用 Ocelot
在 .net 里实现 API Gateway。

## ServiceRunner

因为底层服务是使用 ExtCore 实现的，所以需要一个运行的容器来运行一个或者一组扩展。这也是为什么本架构只是近似微服务的架构。
每个服务并不一定是完全独立的，可能是在同一个 Runner 里运行多个服务。因为在企业服务里，如果不是平台化的服务，
则一个企业都只是部属一套服务。这样的结果是：不需要开那么多的服务来浪费系统资源。

## Extensions

基于 ExtCore 的服务架构，功能是实现在 ExtCore 的扩展中的。


## 其它语言的服务

因为是微服务的架构，所以还可以使用比如 egg.js 来实现一些小的服务，而不需要把所有有服务都实现在 .net 中。
