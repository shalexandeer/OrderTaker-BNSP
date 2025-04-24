import { eq } from 'drizzle-orm';
import { restaurants } from '@/schema/restaurant';
import { db } from '@/utils/db';

export async function getAllRestaurants() {
  return await db.select().from(restaurants);
}

export async function getRestaurantById(id: string) {
  const [restaurant] = await db.select().from(restaurants).where(eq(restaurants.id, id)).limit(1);
  return restaurant;
}

export async function createRestaurant(data: { name: string; branch: string }) {
  const [newRestaurant] = await db.insert(restaurants).values(data).returning({
    id: restaurants.id,
    name: restaurants.name,
    branch: restaurants.branch,
  });
  return newRestaurant;
}

export async function updateRestaurant(id: string, data: { name?: string; branch?: string }) {
  const [updatedRestaurant] = await db.update(restaurants).set(data).where(eq(restaurants.id, id)).returning({
    id: restaurants.id,
    name: restaurants.name,
    branch: restaurants.branch,
  });
  return updatedRestaurant;
}

export async function deleteRestaurant(id: string) {
  const [deletedRestaurant] = await db.delete(restaurants).where(eq(restaurants.id, id)).returning();
  return deletedRestaurant;
}
