import { useUserStore } from "/stores/user.js";

export const routerGuard = () => {
  router.beforeEach(async (to, from, next) => {
    const userStore = useUserStore();
    if (to.meta.requiresAuth === false) {
      return next();
    }

    const isAuth = await userStore.checkAuth();
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
