const API_ROUTE = "admin/additionals";

export const additionalKeys = {
  all: ["additionals"] as const,
  lists: (foodId: string) => [...additionalKeys.all, foodId, "list"] as const,
  details: (id: string) => [...additionalKeys.all, id] as const,
};

export const additionalApiEndpoints = {
  list: API_ROUTE,
  create: API_ROUTE,
  get: (id: string) => `${API_ROUTE}/${id}`,
  update: (id: string) => `${API_ROUTE}/${id}`,
  delete: (id: string) => `${API_ROUTE}/${id}`,
  byFood: (foodId: string) => `foods/${foodId}/additionals`,
};
