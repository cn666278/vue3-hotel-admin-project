import { createRouter, createWebHashHistory } from "vue-router";
import 'pace-progressbar';
import 'pace-progressbar/themes/blue/pace-theme-minimal.css';

const routes = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "登陆",
      meta: {title: "登陆"},
      component: () => import("../views/Login.vue"),
    },
    {
      path: "/login",
      redirect: "/",
    },
    {
      path: "/main",
      name: "主页",
      meta: {title: "主页"},
      component: () => import("../views/Main.vue"),
      children: [
        {
          path: "/check-in",
          name: "入住管理",
          meta: {title: "入住管理"},
          component: () => import("../views/customer/CheckIn.vue"),
        },
        {
          path: "/order",
          name: "订单管理",
          meta: {title: "订单管理"},
          component: () => import("../views/customer/Order.vue"),
        },
        {
          path: "/home",
          name: "首页",
          meta: {title: "首页"},
          component: () => import("../views/home/Home.vue"),
        },
        {
          path: "/mail",
          name: "邮件",
          meta: {title: "邮件"},
          component: () => import("../views/mail/Mail.vue"),
        },
        {
          path: "/message",
          name: "消息",
          meta: {title: "消息"},
          component: () => import("../views/message/Message.vue"),
        },
        {
          path: "/room",
          name: "房间管理",
          meta: {title: "房间管理"},
          component: () => import("../views/room/Room.vue"),
        },
        {
          path: "/room-type",
          name: "房型管理",
          meta: {title: "房型管理"},
          component: () => import("../views/room/RoomType.vue"),
        },
        {
          path: "/dictionary",
          name: "字典管理",
          meta: {title: "字典管理"},
          component: () => import("../views/system/Dictionary.vue"),
        },
        {
          path: "/menu",
          name: "菜单管理",
          meta: {title: "菜单管理"},
          component: () => import("../views/system/Menu.vue"),
        },
        {
          path: "/personal",
          name: "个人中心",
          meta: {title: "个人中心"},
          component: () => import("../views/user/Personal.vue"),
        },
        {
          path: "/role",
          name: "角色管理",
          meta: {title: "角色管理"},
          component: () => import("../views/user/Role.vue"),
        },
        {
          path: "/set-password",
          name: "修改密码",
          meta: {title: "修改密码"},
          component: () => import("../views/user/SetPwd.vue"),
        },
        {
          path: "/user",
          name: "用户管理",
          meta: {title: "用户管理"},
          component: () => import("../views/user/User.vue"),
        },
      ],
    },
  ],
});

// 路由守卫，判断是否登录，未登录跳转到登录页
routes.beforeEach((to, from, next) => {
  next();
});

// 修改页面标题, 通过路由元信息meta.title
routes.afterEach((to, from) => {
  // 保护性判断，如果没有设置meta.title，则不修改标题
  if (to.meta.title) {
    document.title = String(to.meta.title);
  }
});
export default routes;
