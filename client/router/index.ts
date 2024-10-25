import { storeToRefs } from "pinia";
import { createRouter, createWebHistory } from "vue-router";

import { useUserStore } from "@/stores/user";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import NotFoundView from "../views/NotFoundView.vue";
import SettingView from "../views/SettingView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomeView,
    },
    {
      path: "/setting",
      name: "Settings",
      component: SettingView,
      meta: { requiresAuth: true },
    },
    {
      path: "/login",
      name: "Login",
      component: LoginView,
      meta: { requiresAuth: false },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      beforeEnter: (to, _from) => {
        const { isLoggedIn } = storeToRefs(useUserStore());
        if (isLoggedIn.value && to.name === "Login") {
          return { name: "Settings" };
        }
        // You could add more conditions based on `to` and `from`
      },
    },
    {
      path: "/chats",
      name: "Chats",
      component: () => import("@/components/Chatting/ChatRoom.vue"), // Assuming you have a ChatRoom.vue component
      meta: {
        requiresAuth: true, // If you want to protect the route
      },
    },
    // {
    //   path: "/locating",
    //   name: "Locating",
    //   component: () => import("../components/Locating/MapView.vue"), // Assuming you have a ChatRoom.vue component
    //   meta: {
    //     requiresAuth: true, // If you want to protect the route
    //   },
    // },
    {
      path: "/safemeeting",
      name: "SafeMeeting",
      component: () => import("../components/Meeting/SafeMeeting.vue"), // Adjust path as necessary
    },
    {
      path: "/:catchAll(.*)",
      name: "not-found",
      component: NotFoundView,
    },
  ],
});

/**
 * Navigation guards to prevent user from accessing wrong pages.
 */
router.beforeEach((to) => {
  const { isLoggedIn } = storeToRefs(useUserStore());

  if (to.meta.requiresAuth && !isLoggedIn.value) {
    return { name: "Login" };
  }
});

export default router;
