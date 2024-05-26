import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
// 导入路由
import router from "./router";
import { createPinia } from "pinia";

// 导入element-plus
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

createApp(App)
.use(ElementPlus)
.use(router)
.use(createPinia())
.mount("#app");
