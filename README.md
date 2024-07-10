# Vue 3 + TypeScript + Vite + Element Plus

项目简介：Vue酒店后台管理系统
- 项目简介：一个后台前端解决方案,使用了许多最新的前端技术栈、动态路由，权限验证，并且有着丰富的组件和功能。
-	主要技术栈： Vue3、Vite、TypeScript、Pinia、Element Plus、Axios、Vue Router
-	主要工作：
  1.  项目使用Vite脚手架搭建，配合使用Element Plus，使用vite自动生成路由，优化路由
  2.	实现用户表单中的新增，编辑和删除功能，日期格式化以及表单验证。
  3.	二次封装axios，添加拦截器，获取请求参数。使用Mock.js进行数据拦截和数据模拟。
  4.	对api接口实现统一管理，可进行本地模拟数据测试（测试开关），也可发送axios请求获取数据。
  5.	ApiFox 手写api接口：[项目接口文档-ApiFox](https://apifox.com/apidoc/shared-5db293f4-0f21-42ae-aa51-a3eb1c431640)
  6.	使用Echarts绘制数据图（线图，饼图，柱状图）
  7.	导航栏面包屑实现，使用Pinia实现跨组件通信，:deep() !important 实现样式穿透, tab标签路由实现
  8.	实现数据持久化，刷新页面后，pinia中的用户登陆数据不会丢失，数据持久化的原理是将数据存储到sessionStorage中，当页面刷新时，从sessionStorage中取出数据，再存储到pinia store中
  9.	动态路由，路由守卫
  10.	使用setup重构项目代码，简化返回
  11.	添加提示dialog
