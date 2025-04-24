import { pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const restaurants = pgTable('restaurants', {
  id: uuid('id').notNull().primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  branch: varchar('branch', { length: 255 }).notNull(), // Branch location (e.g., "Downtown")
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const selectRestaurantSchema = createSelectSchema(restaurants);

export const addRestaurantSchema = z.object({
  body: selectRestaurantSchema.pick({
    name: true,
    branch: true,
  }),
});

export const updateRestaurantSchema = z.object({
  body: selectRestaurantSchema
    .pick({
      name: true,
      branch: true,
    })
    .partial(),
});

export const deleteRestaurantSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});
