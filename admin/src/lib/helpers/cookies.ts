import Cookies from "universal-cookie";

// Helper function to get token from cookies
export const getToken = (): string | undefined => {
  const cookies = new Cookies();
  return cookies.get("@app/token");
};

// Helper function to set token in cookies
export const setToken = (token: string): void => {
  const cookies = new Cookies();
  cookies.set("@app/token", token, { path: "/" });
};

// Helper function to remove token from cookies
export const removeToken = (): void => {
  const cookies = new Cookies();
  cookies.remove("@app/token", { path: "/" });
};
