import { createRouter, createWebHistory } from "vue-router";
import Home from "/views/Home.vue";
import Login from "/views/Login.vue";
import App from "/src/App.vue";
const routes = [
  {
    path: "/",
    name: "WelcomePage",
    component: App,
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
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
});

export default router;
