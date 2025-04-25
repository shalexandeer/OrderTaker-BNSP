export interface Food {
  id: string;
  name: string;
  categoryId: string;
  description: string;
  img: string;
  price: number;
  availability: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface FoodCreatePayload {
  name: string;
  categoryId: string;
  description: string;
  img: string;
  price: number;
  availability?: boolean;
}

export interface FoodUpdatePayload {
  name?: string;
  categoryId?: string;
  description?: string;
  img?: string;
  price?: number;
  availability?: boolean;
}
