import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import { logAPI } from "/servises/api.js";

export const useUserStore = defineStore("user", () => {
  const router = useRouter();

  //Variables
  const user = ref(null);
  const refreshToken = ref(sessionStorage.getItem("refreshToken" || null));
  const accessToken = ref(sessionStorage.getItem("accessToken" || null));
  const isLoading = ref(false);
  const error = ref(null);
  const redirectPath = ref(null);

  //getters
  const isLoged = computed(() => {
    return !!accessToken.value;
  });

  const getUserName = computed(() => {
    let name = !!user.value ? user.value : "Guest";
    return name;
  });

  //functions
  const setTokens = (acsToken, refToken) => {
    refreshToken.value = refToken;
    accessToken.value = acsToken;

    sessionStorage.setItem("refreshToken", refToken);
    sessionStorage.setItem("accessToken", acsToken);
  };

  const ClearUserData = () => {
    user.value = null;
    refreshToken.value = null;
    accessToken.value = null;

    sessionStorage.removeItem("refreshToken");
    sessionStorage.removeItem("accessToken");
  };

  const login = async (credential) => {
    isLoading.value = true;
    error.value = false;

    try {
      const response = await logAPI(credential);
      const { username, accessToken, refreshToken } = response.data;

      //saveToken
      setTokens(accessToken, refreshToken);

      //saveName
      user.value = username;
      //redirect path
      const path = redirectPath.value || "/";
      redirectPath.value = null;

      await router.push(path);

      return true;
    } catch (err) {
      error.value = "Ошибка при входе в систему";
      return false;
    } finally {
      isLoading.value = false;
    }
  };

  const logout = () => {
    ClearUserData();
    router.push("/Login");
  };

  //вероятно к реализации
  const checkAuth = () => {};

  const initialize = () => {};
  return { count, doubleCount, increment };
});
