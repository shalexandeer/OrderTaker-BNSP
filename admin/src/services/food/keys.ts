const API_ROUTE = "foods";

export const foodKeys = {
  all: ["foods"] as const,
  lists: () => [...foodKeys.all, "list"] as const,
  details: (id: string) => [...foodKeys.all, id] as const,
};

export const foodApiEndpoints = {
  list: API_ROUTE,
  create: API_ROUTE,
  get: (id: string) => `${API_ROUTE}/${id}`,
  update: (id: string) => `${API_ROUTE}/${id}`,
  delete: (id: string) => `${API_ROUTE}/${id}`,
  search: `${API_ROUTE}/search`,
  byCategory: (categoryId: string) => `${API_ROUTE}/category/${categoryId}`,
};
