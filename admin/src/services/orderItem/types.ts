export interface OrderItem {
  id: string;
  orderId: string;
  foodId: string;
  quantity: number;
  price: number;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItemCreatePayload {
  foodId: string;
  quantity: number;
  notes?: string;
}

export interface OrderItemUpdatePayload {
  quantity?: number;
  notes?: string;
}
