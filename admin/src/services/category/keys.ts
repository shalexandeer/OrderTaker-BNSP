const API_ROUTE = "categories";

export const categoryKeys = {
  all: ["categories"] as const,
  lists: () => [...categoryKeys.all, "list"] as const,
  details: (id: string) => [...categoryKeys.all, id] as const,
};

export const categoryApiEndpoints = {
  list: API_ROUTE,
  create: API_ROUTE,
  get: (id: string) => `${API_ROUTE}/${id}`,
  update: (id: string) => `${API_ROUTE}/${id}`,
  delete: (id: string) => `${API_ROUTE}/${id}`,
};
