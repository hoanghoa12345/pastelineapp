import InboxVue from "@/views/inbox/Inbox.vue";
import {
  createRouter,
  createWebHistory,
  RouteRecordRaw,
} from "../../node_modules/vue-router/dist/vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    name: "Home",
    path: "/",
    component: InboxVue,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
