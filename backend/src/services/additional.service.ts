import { eq } from 'drizzle-orm';
import { additional } from '@/schema/additional';
import { db } from '@/utils/db';
import type { NewAdditional, UpdateAdditional } from '@/schema/additional';

export async function getAllAdditionals() {
  return await db.select().from(additional);
}

export async function getAdditionalById(id: string) {
  const [additionalItem] = await db.select().from(additional).where(eq(additional.id, id)).limit(1);
  return additionalItem;
}

export async function getAdditionalsByFoodId(foodId: string) {
  return await db.select().from(additional).where(eq(additional.foodId, foodId));
}

export async function createAdditional(data: NewAdditional) {
  const [newAdditional] = await db.insert(additional).values(data).returning({
    id: additional.id,
    foodId: additional.foodId,
    name: additional.name,
    price: additional.price,
  });
  return newAdditional;
}

export async function updateAdditional(id: string, data: UpdateAdditional) {
  const [updatedAdditional] = await db.update(additional)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(additional.id, id))
    .returning({
      id: additional.id,
      foodId: additional.foodId,
      name: additional.name,
      price: additional.price,
    });
  return updatedAdditional;
}

export async function deleteAdditional(id: string) {
  const [deletedAdditional] = await db.delete(additional)
    .where(eq(additional.id, id))
    .returning();
  return deletedAdditional;
}
