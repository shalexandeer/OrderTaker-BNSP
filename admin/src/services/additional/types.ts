export interface Additional {
  id: string;
  foodId: string;
  name: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface AdditionalCreatePayload {
  foodId: string;
  name: string;
  price: number;
}

export interface AdditionalUpdatePayload {
  name?: string;
  price?: number;
}
