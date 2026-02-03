import { createRouter, createWebHistory } from "vue-router";
import { routerGuard } from "@/router/routerGuard.js";
import Home from "/views/Home.vue";
import Login from "/views/Login.vue";
import WelcomePage from "/views/WelcomePage.vue";
import postDetails from "/views/postDetails.vue";
const routes = [
  {
    path: "/",
    name: "WelcomePage",
    component: WelcomePage,
    meta: { requiresAuth: false },
  },

  {
    path: "/home",
    name: "Home",
    component: Home,
    meta: { requiresAuth: true },
  },

  {
    path: "/Login",
    name: "Login",
    component: Login,
    meta: { requiresAuth: false },
  },

  {
    path: "/post/:id",
    component: postDetails,
    name: "postDetails",
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
});

routerGuard(router);

export default router;
