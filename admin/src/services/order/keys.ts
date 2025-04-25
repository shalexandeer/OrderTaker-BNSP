const API_ROUTE = "admin/orders";

export const orderKeys = {
  all: ["orders"] as const,
  lists: () => [...orderKeys.all, "list"] as const,
  details: (id: string) => [...orderKeys.all, id] as const,
};

export const orderApiEndpoints = {
  list: API_ROUTE,
  get: (id: string) => `${API_ROUTE}/${id}`,
  update: (id: string) => `${API_ROUTE}/${id}`,
};
