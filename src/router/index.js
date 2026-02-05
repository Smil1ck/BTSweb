import { createRouter, createWebHistory } from "vue-router";
import { routerGuard } from "@/router/routerGuard.js";
import Home from "/views/Home.vue";
import Login from "/views/Login.vue";
import WelcomePage from "/views/WelcomePage.vue";
import postDetails from "/views/postDetails.vue";
import CreatePostPage from "/views/CreatePostPage.vue";
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
    meta: { requiresAuth: true, title: "Главная" },
  },

  {
    path: "/Login",
    name: "Login",
    component: Login,
    meta: { requiresAuth: false, title: "Страница Авторизации" },
  },

  {
    path: "/post/:id",
    component: postDetails,
    name: "postDetails",
    meta: { requiresAuth: true, title: "Подробно о посте" },
  },

  {
    path: "/post/new",
    component: CreatePostPage,
    name: "CreatePostPage",
    meta: { requiresAuth: true, title: "Новый пост" },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
});

routerGuard(router);

router.afterEach((to) => {
  document.title = to.meta.title || "Мой сайт";
});

export default router;
