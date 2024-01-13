import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import MainLayout from "@/layouts/MainLayout.vue";
import NProgress from "@/utils/nprogress";
// import { checkUserLoggedIn } from "@/utils/helper";

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
      {
        name: "CreateNote",
        path: "create",
        component: () => import("@/views/notes/CreateNote.vue"),
        beforeEnter: () => {
          localStorage.removeItem("newNoteId");
        },
      },
      {
        name: "editNote",
        path: "notes/:noteId",
        component: () => import("@/views/notes/EditNote.vue"),
      },
      {
        name: "collections",
        path: "collections",
        component: () => import("@/views/collections/Collections.vue"),
      },
      {
        name: "Docs",
        path: "docs",
        component: () => import("@/views/documents/Docs.vue"),
      },
      {
        name: "Help",
        path: "help",
        component: () => import("@/views/documents/Help.vue"),
      },
      {
        name: "Profile",
        path: "profile",
        component: () => import("@/views/personal/Profile.vue"),
      },
      {
        name: "AccountSettings",
        path: "account-settings",
        component: () => import("@/views/personal/AccountSettings.vue"),
      },
      {
        name: "Recent",
        path: "recent",
        component: () => import("@/views/recent/Recent.vue"),
      },
      {
        path: "/:pathMatch(.*)*",
        name: "NotFound",
        component: () => import("@/views/not-found/NotFound.vue"),
      },
    ],
    beforeEnter: async (to, from) => {
      // const userStore = useUserStore();
      // try {
      //   await userStore.getProfile();
      //   if (userStore.user) {
      //     return true;
      //   }
      // } catch (error) {
      //   if (userStore.errorCode === "ERR_NETWORK") {
      //     return true;
      //   }
      //   return {
      //     path: "/login",
      //   };
      // }
    },
  },
  {
    name: "Login",
    path: "/login",
    component: () => import("@/views/signin/SignIn.vue"),
    // beforeEnter: [checkUserLoggedIn],
  },
  {
    name: "SignUp",
    path: "/signup",
    component: () => import("@/views/signup/SignUp.vue"),
    // beforeEnter: [checkUserLoggedIn],
  },
  {
    name: "ForgotPassword",
    path: "/forgot-password",
    component: () => import("@/views/signin/ForgotPassword.vue"),
  },
  {
    name: "RecoverPassword",
    path: "/reset-password",
    component: () => import("@/views/signin/RecoverPassword.vue"),
  },
  {
    name: "VerifyEmail",
    path: "/verify",
    component: () => import("@/views/signup/VerifyEmail.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/views/not-found/NotFound.vue"),
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
