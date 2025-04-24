import { integer, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

import type { InferSelectModel } from 'drizzle-orm';
import { createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { foods } from '@/schema/food';

export const additional = pgTable('additional', {
  id: uuid('id').notNull().primaryKey().defaultRandom(),
  foodId: uuid('food_id')
    .notNull()
    .references(() => foods.id, { onDelete: 'cascade' }), // Foreign key to foods table
  name: text('name').notNull(), // Name of the additional item
  price: integer('price').notNull(), // Price of the additional item
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const selectAdditionalSchema = createSelectSchema(additional);

export const addAdditionalSchema = z.object({
  body: selectAdditionalSchema
    .pick({
      foodId: true,
      name: true,
      price: true,
    })
    .extend({
      foodId: z.string().uuid(),
      price: z.number().int().positive(),
    }),
});

export const updateAdditionalSchema = z.object({
  body: selectAdditionalSchema
    .pick({
      name: true,
      price: true,
    })
    .partial()
    .extend({
      price: z.number().int().positive().optional(),
    }),
});

export const deleteAdditionalSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});

export type Additional = InferSelectModel<typeof additional>;
export type NewAdditional = z.infer<typeof addAdditionalSchema>['body'];
export type UpdateAdditional = z.infer<typeof updateAdditionalSchema>['body'];
