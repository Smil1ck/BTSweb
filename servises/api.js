// Все что связанно с взаимодействием с апишкой
const BASE_API_URL = "https://dummyjson.com";

const base_api_params = {
  baseURL: BASE_API_URL,
  headers: { "Content-Type": "application/json" },
  method: "POST",
  tokenLifeTime: 30,
};

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
