import {
  getSinglePost,
  getAuthor,
  getComms,
  updatePostAPI,
} from "/servises/api.js";
import { useUserStore } from "@/stores/user";

//getPost
export const getPost = async (postId) => {
  return await getSinglePost(postId);
};
//getcomms
export const getComments = async (postId) => {
  return await getComms(postId);
};
//getUser
export const getUser = async (userId) => {
  return await getAuthor(userId);
};
//updatePost
export const updatePost = async (changes, postId) => {
  const userStore = useUserStore();
  try {
    let response = await updatePostAPI(changes, postId, userStore.accessToken);
    if (response.message === "Token Expired!") {
      await userStore.refreshTokens(userStore.refreshToken);
      // console.log("im here 1");
      response = await updatePostAPI(changes, postId, userStore.accessToken);
    }
    return [true, response];
  } catch (err) {
    return [false, response];
  }
};
