export * from "./route";
export * from "./contants";
export * from "./fonts";

export const appConfigs = {
  // baseURL: `http://localhost:3000`,
  baseURL: `https://eco-cupid-flax.vercel.app`,
  // baseURL: `https://test-ecocupid.vutrgsinh.online`,
};

export const apiWithoutToken = [
  "/authen/login",
  "/article/get-by-code",
  "/home"
]

export const routesWithoutDynamic = [
  "/",
  "/about-us",
  "/eco-films",
  "/volunteers",
  // "/eco-stories",
  // "/our-readers-stories"
]