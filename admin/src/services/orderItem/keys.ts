const API_ROUTE = "admin/orders";

export const orderItemKeys = {
  all: ["orderItems"] as const,
  lists: (orderId: string) => [...orderItemKeys.all, orderId, "list"] as const,
};

export const orderItemApiEndpoints = {
  list: (orderId: string) => `${API_ROUTE}/${orderId}/items`,
  create: (orderId: string) => `${API_ROUTE}/${orderId}/items`,
  delete: (orderId: string, itemId: string) =>
    `${API_ROUTE}/${orderId}/items/${itemId}`,
};
