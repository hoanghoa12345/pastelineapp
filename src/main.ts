import { createApp } from "vue";
import Vue3Toasity from "vue3-toastify";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import pinia from "./stores";
import "vue3-toastify/dist/index.css";

const app = createApp(App);
app.use(Vue3Toasity);
app.use(router);
app.use(pinia);
app.mount("#app");
