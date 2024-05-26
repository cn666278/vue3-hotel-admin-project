import { defineStore } from "pinia";

export default defineStore("user", {
  state: () => ({
    user: {
      username: "admin",
    },
  }),
  actions: {
    setUser(user: { username: string }) {
      this.user = user;
    },
  },
});
