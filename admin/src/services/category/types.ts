export interface Category {
  id: string;
  name: string;
  img: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CategoryCreatePayload {
  name: string;
  img: string;
}

export interface CategoryUpdatePayload {
  name?: string;
  img?: string;
}
