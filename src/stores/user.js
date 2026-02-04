import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import { logAPI, refAPI, authAPI } from "/servises/api.js";

export const useUserStore = defineStore("user", () => {
  const router = useRouter();

  //Variables
  const user = ref(null);
  const refreshToken = ref(sessionStorage.getItem("refreshToken") || null);
  const accessToken = ref(sessionStorage.getItem("accessToken") || null);
  const isLoading = ref(false);
  const error = ref(null);
  const redirectPath = ref(null);

  //getters
  const isLoged = computed(() => {
    if (!accessToken.value) {
      return false;
    } else {
      return true;
    }
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

  const setLoading = (value) => {
    isLoading.value = value;
  };

  const ClearUserData = () => {
    user.value = null;
    refreshToken.value = null;
    accessToken.value = null;

    sessionStorage.removeItem("refreshToken");
    sessionStorage.removeItem("accessToken");
  };

  const SetRedirectPath = (path) => {
    redirectPath.value = path;
  };

  const login = async (credential) => {
    isLoading.value = true;
    error.value = false;

    try {
      const response = await logAPI(credential);
      const { username, accessToken, refreshToken } = response;

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
      throw new Error(error.value);
      return false;
    } finally {
      isLoading.value = false;
    }
  };

  const logout = () => {
    ClearUserData();
    router.push("/Login");
  };

  //в будующем обертка для обращения к серверу
  // types:'auth'...
  const checkAuth = async (type) => {
    if (!accessToken.value) {
      return false;
    }

    try {
      switch (type) {
        case "auth":
          await authAPI(accessToken.value);
          return true;
        default:
          await authAPI(accessToken.value);
          return true;
      }
    } catch (err) {
      return false;
    }
  };

  const refreshTokens = async (refToken) => {
    try {
      const response = await refAPI(refToken);
      console.log(response);
      const { accessToken, refreshToken } = response;
      setTokens(accessToken, refreshToken);
    } catch (err) {
      throw new Error("401");
    }
  };

  const initialize = async () => {
    if (accessToken.value && !user.value) {
      try {
        isLoading.value = true;
        let response = await authAPI(accessToken.value);
        if (response.message === "Token Expired!") {
          await refreshTokens(refreshToken.value);
          // console.log("im here 1");
          response = await authAPI(accessToken.value);
        }
        // console.log("im here 3");
        const { username } = response;
        user.value = username;
      } catch (err) {
        //       console.log("im here");
        logout();
      } finally {
        isLoading.value = false;
      }
    }
  };

  return {
    //variables
    user,
    refreshToken,
    accessToken,
    error,
    redirectPath,
    isLoading,
    //getters
    isLoged,
    getUserName,
    //fuctions
    refreshTokens,
    login,
    setTokens,
    ClearUserData,
    logout,
    checkAuth,
    initialize,
    SetRedirectPath,
    setLoading,
  };
});
