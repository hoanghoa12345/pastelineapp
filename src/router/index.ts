import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import MainLayout from "@/layouts/MainLayout.vue";
import NProgress from "@/utils/nprogress";

NProgress.configure({ showSpinner: false });

const routes: Array<RouteRecordRaw> = [
  {
    name: "AppLayout",
    path: "/",
    component: MainLayout,
    children: [
      {
        name: "Default",
        path: "",
        component: () => import("@/views/default/Default.vue"),
      },
      {
        name: "Notes",
        path: "notes",
        component: () => import("@/views/notes/AllNotes.vue"),
      },
      //   {
      //     name: "Video",
      //     path: "video/:id",
      //     component: () => import("@/pages/Video.vue"),
      //   },
      {
        path: "/:pathMatch(.*)*",
        name: "NotFound",
        component: () => import("@/views/not-found/NotFound.vue"),
      },
    ],
  },
  {
    name: "Login",
    path: "/login",
    component: () => import("@/views/signin/SignIn.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  next();
  NProgress.start();
});

router.afterEach((to, from) => {
  NProgress.done();
});
export default router;
