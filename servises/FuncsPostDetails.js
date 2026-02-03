import { getSinglePost, getAuthor, getComms } from "/servises/api.js";
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
