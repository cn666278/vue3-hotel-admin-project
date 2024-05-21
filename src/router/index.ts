import { createRouter, createWebHashHistory } from "vue-router";

const routes = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "Login",
      component: () => import("../views/Login.vue"),
    },
    {
      path: "/login",
      redirect: "/",
    },
    {
      path: "/index",
      name: "Index",
      component: () => import("../views/Index.vue"),
    },
  ],
});

export default routes;
