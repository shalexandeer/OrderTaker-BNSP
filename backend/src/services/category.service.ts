import { eq } from 'drizzle-orm';
import { categories } from '@/schema/category';
import { db } from '@/utils/db';

export async function getAllCategories() {
  return await db.select({
    id: categories.id,
    name: categories.name,
    img: categories.img,
    createdAt: categories.createdAt,
  }).from(categories);
}

export async function getCategoryById(id: string) {
  const [category] = await db.select().from(categories).where(eq(categories.id, id)).limit(1);
  return category;
}

export async function createCategory(data: { name: string; img: string }) {
  const [newCategory] = await db.insert(categories).values(data).returning({
    id: categories.id,
    name: categories.name,
    img: categories.img,
  });
  return newCategory;
}

export async function updateCategory(id: string, data: { name?: string; img?: string }) {
  const [updatedCategory] = await db.update(categories).set(data).where(eq(categories.id, id)).returning({
    id: categories.id,
    name: categories.name,
    img: categories.img,
  });
  return updatedCategory;
}

export async function deleteCategory(id: string) {
  const [deletedCategory] = await db.delete(categories).where(eq(categories.id, id)).returning();
  return deletedCategory;
}
