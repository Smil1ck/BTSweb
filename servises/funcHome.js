import { postGetAPI } from "/servises/api.js";

export const initPage = async (currentPage, maxPosts) => {
  if (localStorage.getItem("postsData") === null) {
    // console.log("im here1");
    const response = await postGetAPI(currentPage, maxPosts);
    // console.log(response);
    localStorage.setItem("postsData", JSON.stringify(response));
    // console.log("im here2");
  }
};

export const getNewPages = async (currentPage, maxPosts) => {
  localStorage.clear();
  const response = await postGetAPI(currentPage, maxPosts);
  localStorage.setItem("postsData", JSON.stringify(response));
};
