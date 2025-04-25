const API_ROUTE = "admin";

export const authKeys = {
  all: ["auth"] as const,
  login: () => [...authKeys.all, "login"] as const,
  currentUser: () => [...authKeys.all, "currentUser"] as const,
};

export const storageKeys = {
  accessToken: "access_token",
  user: "user",
};

export const apiEndpoints = {
  auth: {
    login: `${API_ROUTE}/login`,
  },
};
