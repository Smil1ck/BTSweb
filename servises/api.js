// Все что связанно с взаимодействием с апишкой
const BASE_API_URL = "https://dummyjson.com";

const base_api_params = {
  baseURL: BASE_API_URL,
  headers: { "Content-Type": "application/json" },
  method: "POST",
  tokenLifeTime: 1,
};

//БЛОК АВТОРИЗАЦИИ-----------------------------------------------------------------------------------------------------------------
export const logAPI = async (credential) => {
  const response = await fetch(`${base_api_params.baseURL}/auth/login`, {
    method: base_api_params.method,
    headers: base_api_params.headers,
    body: JSON.stringify({
      username: credential.username.value.trim(),
      password: credential.password.value.trim(),
      expiresInMins: base_api_params.tokenLifeTime,
    }),
  });
  const result = await response.json();
  console.log(result);
  if (result.message === "Invalid credentials") {
    throw new Error("Invalid credentials");
  }
  return result;
};

export const refAPI = async (refreshToken) => {
  const response = await fetch(`${base_api_params.baseURL}/auth/refresh`, {
    method: base_api_params.method,
    headers: base_api_params.headers,
    body: JSON.stringify({
      refreshToken: refreshToken,
      expiresInMins: base_api_params.tokenLifeTime,
    }),
  });
  const result = await response.json();
  console.log(result);
  if (result.message === "Invalid credentials") {
    throw new Error("Invalid credentials");
  }
  return result;
};

const authHeders = (accessToken) => {
  return { Authorization: `Bearer ${accessToken.trim()}` };
};

export const authAPI = async (accessToken) => {
  console.log(accessToken);
  const response = await fetch(`${base_api_params.baseURL}/auth/me`, {
    method: "GET",
    headers: authHeders(accessToken),
  });
  const result = await response.json();
  console.log(result);
  if (result.message === "invalid token") {
    throw new Error("invalid token");
  }
  return result;
};
//БЛОК АВТОРИЗАЦИИ-----------------------------------------------------------------------------------------------------------------
//БЛОК ПОСТОВ-----------------------------------------------------------------------------------------------------------------

export const postGetAPI = async (currentPage, maxPosts) => {
  const selectParams = "title,reactions,userId,body,tags";
  const response = await fetch(
    `${base_api_params.baseURL}/posts?limit=${maxPosts}&skip=${(currentPage - 1) * 10}&select=${selectParams}`,
  );
  const result = await response.json();
  console.log(result);
  return result;
};

//БЛОК ПОСТОВ Для детального просмотра-----------------------------------------------------------------------------------------------------------------

//get a single post
export const getSinglePost = async (postId) => {
  const response = await fetch(`${base_api_params.baseURL}/posts/${postId}`);
  const result = await response.json();
  return result;
};
//get author
export const getAuthor = async (userId) => {
  const response = await fetch(`${base_api_params.baseURL}/users/${userId}`);
  const result = await response.json();
  return result;
};
//getComms
export const getComms = async (postId) => {
  const response = await fetch(
    `${base_api_params.baseURL}/posts/${postId}/comments`,
  );
  const result = await response.json();
  return result;
};
//updatePost
export const updatePostAPI = async (changes, postId, accessToken) => {
  const response = await fetch(`${base_api_params.baseURL}/posts/${postId}`, {
    method: "PUT" /* or PATCH  PUT*/,
    headers: {
      Authorization: `Bearer ${accessToken.trim()}`,
      "Content-Type": "application/json",
    },
    body: changes,
  });
  const result = await response.json();
  if (result.message === "invalid token") {
    throw new Error("invalid token");
  }
  return result;
};
//БЛОК СОЗДАНИЯ НОВОГО ПОСТА
export const addPostAPI = async (data) => {
  const response = await fetch(`${base_api_params.baseURL}/posts/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  console.log(result);
  return result;
};
