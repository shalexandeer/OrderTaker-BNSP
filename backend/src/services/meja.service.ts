import { eq } from 'drizzle-orm';
import { meja } from '@/schema/meja';
import { db } from '@/utils/db';
import type { NewMeja, UpdateMeja } from '@/schema/meja';

export async function getAllMeja() {
  return await db.select().from(meja);
}

export async function getMejaById(id: string) {
  const [table] = await db.select().from(meja).where(eq(meja.id, id)).limit(1);
  return table;
}

export async function createMeja(data: NewMeja) {
  const [newTable] = await db.insert(meja).values({
    number: data.number,
    capacity: data.capacity,
    status: data.status || 'available',
    location: data.location,
  }).returning();

  return newTable;
}

export async function updateMeja(id: string, data: UpdateMeja) {
  const [updatedTable] = await db.update(meja)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(eq(meja.id, id))
    .returning();

  return updatedTable;
}

export async function deleteMeja(id: string) {
  const [deletedTable] = await db.delete(meja)
    .where(eq(meja.id, id))
    .returning();

  return deletedTable;
}
