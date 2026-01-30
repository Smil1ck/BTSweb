import { useUserStore } from "@/stores/user.js";

export const routerGuard = (router) => {
  router.beforeEach(async (to, from, next) => {
    const userStore = useUserStore();
    const isAuth = userStore.isLoged;
    if (to.meta.requiresAuth === false && isAuth === false) {
      return next();
    }

    console.log(isAuth);
    if (to.meta.requiresAuth && !isAuth) {
      userStore.SetRedirectPath(to.fullPath);

      return next({
        name: "Login",
        query: {
          redirect: to.fullPath,
        },
      });
    }

    if (isAuth && to.name === "Login") {
      return next({ name: "Home" });
    }

    next();
  });
};
