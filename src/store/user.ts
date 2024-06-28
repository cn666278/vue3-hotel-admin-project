import { defineStore } from "pinia";

export default defineStore("user", {
  state: () => ({
    user: {
      username: "admin",
      loginId: "",
      photo: "",
      phone: "",
      email: "",
      role: {
        roleId: 0,
        roleName: "",
      },
    },
  }),
  actions: {
    setUser(user: {
      username: string;
      loginId: string;
      photo: string;
      phone: string;
      email: string;
      role: { roleId: number; roleName: string };
    }) {
      this.user = user;
    },
    clearUser() {
      sessionStorage.clear();
      this.user = {
        username: "",
        loginId: "",
        photo: "",
        phone: "",
        email: "",
        role: {
          roleId: 0,
          roleName: "",
        },
      };
    },
  },
  // 数据持久化
  // sessionStorage和localStorage的区别：https://juejin.cn/post/7350143110495518770?searchId=202405270037574BB40A1CE415E404A17A
  // persist: true // 默认使用localStorage (本地永久存储)
  persist: {
    storage: sessionStorage, // 使用sessionStorage (本地临时存储，关闭浏览器窗口后数据消失)
  },
});
