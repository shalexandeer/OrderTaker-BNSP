import { boolean, integer, pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import type { InferSelectModel } from 'drizzle-orm';
import { categories } from './category';

export const foods = pgTable('foods', {
  id: uuid('id').notNull().primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  categoryId: uuid('category_id')
    .notNull()
    .references(() => categories.id, { onDelete: 'cascade' }), // Links to Category
  description: text('description').notNull(),
  img: text('img').notNull(), // URL or path to image
  price: integer('price').notNull(), // Price as integer
  availability: boolean('availability').notNull().default(true), // Default available
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const selectFoodSchema = createSelectSchema(foods);

export const addFoodSchema = z.object({
  body: selectFoodSchema.pick({
    name: true,
    categoryId: true,
    description: true,
    img: true,
    price: true,
    availability: true,
  }).partial({ availability: true }).extend({
    price: z.number().int().positive(), // Ensure price is a positive integer
  }),
});

export const updateFoodSchema = z.object({
  body: selectFoodSchema
    .pick({
      name: true,
      categoryId: true,
      description: true,
      img: true,
      price: true,
      availability: true,
    })
    .partial(), // Allow partial updates
});

export const deleteFoodSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});

export type Food = InferSelectModel<typeof foods>;
export type NewFood = z.infer<typeof addFoodSchema>['body'];
export type UpdateFood = z.infer<typeof updateFoodSchema>['body'];
