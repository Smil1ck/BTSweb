// Все что связанно с взаимодействием с апишкой
const BASE_API_URL = "https://dummyjson.com";

const base_api_params = {
  baseURL: BASE_API_URL,
  headers: { "Content-Type": "application/json" },
  method: "POST",
  tokenLifeTime: 5,
};

export const logAPI = async (credential) => {
  const response = await fetch(`${base_api_params.baseURL}/auth/login`, {
    method: base_api_params.method,
    headers: base_api_params.headers,
    body: JSON.stringify({
      username: credential.username.value,
      password: credential.password.value,
      expiresInMins: base_api_params.tokenLifeTime,
    }),
  });
  const result = await response.json();
  console.log(result);
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

  return result;
};

export const authAPI = async (accessToken) => {
  const response = await fetch(`${base_api_params.baseURL}/auth/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer /${accessToken}/`,
    },
  });
  const result = await response.json();
  console.log(result);

  return result;
};
