import { authAPI, addPostAPI } from "/servises/api.js";
import { useUserStore } from "@/stores/user";

export const addPost = async (data) => {
  const userStore = useUserStore();
  try {
    ////let response = await updatePostAPI(changes, postId, userStore.accessToken);
    //console.log("response");
    //console.log(response);
    let response = await authAPI(userStore.accessToken);
    if (response.message === "Token Expired!") {
      await userStore.refreshTokens(userStore.refreshToken);
      // console.log("im here 1");
      response = await addPostAPI(data);
    } else {
      response = await addPostAPI(data);
    }

    return [true, response];
  } catch (err) {
    return [false, response];
  }
};
