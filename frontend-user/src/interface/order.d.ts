interface HandleCart {
  name: string;
  note: string;
  price: number;
  qty: number;
  from: "food";
  img: string;
  id?: string;
  foodId?: number;
}

interface FoodAdditional {
  id: number;
  foodItemId: number;
  name: string;
  price: number;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  deletedAt?: Date | string;
}

interface FoodItem {
  id?: number;
  orderId?: number;
  foodId: number;
  name: string;
  price: number;
  qty: number;
  note: string;
  prepared?: number;
  foodAdditional?: FoodAdditional[];
  createdAt?: Date | string;
  updatedAt?: Date | string;
  deletedAt?: Date | string;
}

interface OrderData {
  id?: number;
  hotelId?: number;
  orderDate?: string;
  verified?: number;
  preparing?: number;
  delivery?: number;
  arrived?: number;
  paid?: number;
  foodItems: FoodItem[];
  createdAt?: Date | string;
  updatedAt?: Date | string;
  deletedAt?: Date | string;
}
