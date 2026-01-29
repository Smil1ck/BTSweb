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
      username: credential.user,
      password: credential.password,
      expiresInMins: base_api_params.tokenLifeTime,
    }),
  })
    .then((res) => res.json())
    .then(console.log);

  return response;
};

export const refAPI = async (credential) => {
  const response = await fetch(`${base_api_params.baseURL}/auth/refresh`, {
    method: base_api_params.method,
    headers: base_api_params.headers,
    body: JSON.stringify({
      refreshToken: credential.refreshToken,
      expiresInMins: base_api_params.tokenLifeTime,
    }),
  })
    .then((res) => res.json())
    .then(console.log);

  return response;
};
