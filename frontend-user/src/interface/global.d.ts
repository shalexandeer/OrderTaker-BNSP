export interface User {
  id: string; // UUID
  name: string;
  email: string;
  isAdmin: boolean;
  password: string;
  isVerified: boolean;
  salt: string;
  code: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Restaurant {
  id: string; // UUID
  name: string;
  branch: string;
}

export interface Meja {
  id: string; // UUID
  number: string;
  capacity: number;
  status: "available" | "occupied" | "reserved";
  location: "indoor" | "outdoor";
}

export interface Category {
  id: string; // UUID
  name: string;
  img: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Food {
  id: string; // UUID
  name: string;
  categoryId: string; // UUID (references Category.id)
  description: string;
  img: string;
  price: number;
  availability: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Additional {
  id: string; // UUID
  foodId: string; // UUID (references Food.id)
  name: string;
  price: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface OrderItem {
  id: string; // UUID
  orderId: string; // UUID (references Order.id)
  foodId: string; // UUID (references Food.id)
  quantity: number;
  price: number;
  notes?: string; // Optional
  additionalIds?: string[]; // Array of UUIDs (references Additional.id)
  createdAt: Date;
  updatedAt: Date;
}

export interface Order {
  id: string; // UUID
  mejaId: string; // UUID (references Meja.id)
  customerName: string;
  customerEmail: string;
  paymentMethod: "cashier" | "online";
  status: "pending" | "approved" | "preparing" | "completed" | "cancelled";
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderPayload {
  mejaId: string; // UUID (references Meja.id)
  customerName: string;
  customerEmail: string;
  paymentMethod: "cashier" | "online";
  items: OrderItem[]; // Array of OrderItem objects
}

export interface OrderResponse extends Order {
  items: OrderItem[]; // Array of OrderItem objects
  totalPrice: number; // Total price of the order
}

export interface FoodCart {
  name: string;
  note: string;
  price: number;
  quantity: number;
  foodId?: string; // Optional, only if from is "food"
  from: "food"; // Indicates the source of the item
  additionalIds?: string[]; // Array of UUIDs (references Additional.id)
}
