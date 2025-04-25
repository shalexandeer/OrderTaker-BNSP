import path from 'node:path';
import fs from 'node:fs';
import { Buffer } from 'node:buffer';
import { fileURLToPath } from 'node:url';
import { count, eq } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';
import { db } from '@/utils/db';
import { foods } from '@/schema/food';
import { processAndSaveImage } from '@/utils/upload';
import { BackendError } from '@/utils/errors';

export async function getAllFoods(params: {
  page?: number;
  pageSize?: number;
  orderBy?: string;
  isAscending?: boolean;
  querySearch?: string;
}, categoryId: string | null = null) {
  if (categoryId)
    return getFoodsByCategory(params, categoryId);

  const { page = 1, pageSize = 10 } = params;
  const offset = (page - 1) * pageSize;

  const results = await db.select({
    id: foods.id,
    name: foods.name,
    categoryId: foods.categoryId,
    img: foods.img,
    price: foods.price,
    availability: foods.availability,
  }).from(foods).limit(pageSize).offset(offset);

  const countResult = await db.select({ count: count() }).from(foods);
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

export async function getFoodsByCategory(params: {
  page?: number;
  pageSize?: number;
  orderBy?: string;
  isAscending?: boolean;
  querySearch?: string;
}, categoryId: string) {
  const { page = 1, pageSize = 10 } = params;
  const offset = (page - 1) * pageSize;

  const results = await db.select().from(foods).limit(pageSize).offset(offset).where(eq(foods.categoryId, categoryId));
  const countResult = await db.select({ count: count() }).from(foods);
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

export async function createFood(data: {
  name: string;
  categoryId: string;
  description: string;
  img: string;
  price: number;
  availability?: boolean;
}) {
  let imagePath = data.img;
  if (data.img.startsWith('data:image'))
    imagePath = await processAndSaveImage(data.img);

  const [newFood] = await db
    .insert(foods)
    .values({
      ...data,
      img: imagePath,
    })
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
  price?: number;
  availability?: boolean;
}) {
  const [existingFood] = await db.select().from(foods).where(eq(foods.id, id)).limit(1);
  if (!existingFood)
    throw new BackendError('NOT_FOUND');

  const updatedData = { ...data };

  if (data.img) {
    if (data.img.startsWith('data:image'))
      updatedData.img = await processAndSaveImage(data.img);
    else
      updatedData.img = existingFood.img;
  }
  else {
    updatedData.img = existingFood.img;
  }

  const [updatedFood] = await db
    .update(foods)
    .set(updatedData)
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
