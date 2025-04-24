import { eq } from 'drizzle-orm';
import { db } from '@/utils/db';
import { foods } from '@/schema/food';

export async function getAllFoods(categoryId: string | null = null) {
  if (categoryId)
    return getFoodsByCategory(categoryId);

  return await db.select({
    id: foods.id,
    name: foods.name,
    categoryId: foods.categoryId,
    img: foods.img,
    price: foods.price,
    availability: foods.availability,
  }).from(foods).where(
    categoryId ? eq(foods.categoryId, categoryId) : undefined,
  );
}


export async function getFoodsBySearch(search: string) {
  return await db.select({
    id: foods.id,
    name: foods.name,
    categoryId: foods.categoryId,
    img: foods.img,
    price: foods.price,
    availability: foods.availability,
  }).from(foods).where(
    eq(foods.name, search),
  );
}

export async function getFoodById(id: string) {
  const [food] = await db.select().from(foods).where(eq(foods.id, id)).limit(1);
  return food;
}

export async function getFoodsByCategory(categoryId: string) {
  return await db.select().from(foods).where(eq(foods.categoryId, categoryId));
}

export async function createFood(data: {
  name: string;
  categoryId: string;
  description: string;
  img: string;
  price: number;
  availability?: boolean;
}) {
  const [newFood] = await db
    .insert(foods)
    .values(data)
    .returning({
      id: foods.id,
      name: foods.name,
      categoryId: foods.categoryId,
      description: foods.description,
      img: foods.img,
      price: foods.price,
      availability: foods.availability,
    });
  return newFood;
}

export async function updateFood(id: string, data: {
  name?: string;
  categoryId?: string;
  description?: string;
  img?: string;
  price?: number; // Price is explicitly a number (integer)
  availability?: boolean;
}) {
  const [updatedFood] = await db
    .update(foods)
    .set(data)
    .where(eq(foods.id, id))
    .returning({
      id: foods.id,
      name: foods.name,
      categoryId: foods.categoryId,
      description: foods.description,
      img: foods.img,
      price: foods.price,
      availability: foods.availability,
    });
  return updatedFood;
}

export async function deleteFood(id: string) {
  const [deletedFood] = await db.delete(foods).where(eq(foods.id, id)).returning();
  return deletedFood;
}
