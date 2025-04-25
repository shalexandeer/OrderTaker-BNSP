import { count, eq } from 'drizzle-orm';
import { meja } from '@/schema/meja';
import { db } from '@/utils/db';
import type { NewMeja, UpdateMeja } from '@/schema/meja';

export async function getAllMeja(params: {
  page?: number;
  pageSize?: number;
  orderBy?: string;
  isAscending?: boolean;
  querySearch?: string;
}) {
  const { page = 1, pageSize = 10 } = params;
  const offset = (page - 1) * pageSize;
  const results = await db.select().from(meja).limit(pageSize).offset(offset);
  const countResult = await db.select({ count: count() }).from(meja);
  const countData = countResult[0]?.count ?? 0;

  return {
    data: results,
    pagination: {
      page,
      pageSize,
      totalData: Number(countData),
      totalPage: Math.ceil(Number(countData) / pageSize),
    },
  };
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
