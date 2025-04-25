export interface Order {
  id: string;
  mejaId: string;
  customerName: string;
  customerEmail: string;
  paymentMethod: "cashier" | "online";
  status: "pending" | "approved" | "preparing" | "completed" | "cancelled";
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderUpdatePayload {
  status?: Order["status"];
  paymentMethod?: Order["paymentMethod"];
  totalPrice?: number;
}
