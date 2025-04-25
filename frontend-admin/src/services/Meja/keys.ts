const API_ROUTE = "/api/meja";

export const mejaKeys = {
  all: ["meja"] as const,
  lists: () => [...mejaKeys.all, "list"] as const,
  details: (id: string) => [...mejaKeys.all, id] as const,
};

export const mejaApiEndpoints = {
  list: API_ROUTE,
  create: API_ROUTE,
  get: (id: string) => `${API_ROUTE}/${id}`,
  update: (id: string) => `${API_ROUTE}/${id}`,
  delete: (id: string) => `${API_ROUTE}/${id}`,
};
