import type { InferSelectModel } from 'drizzle-orm';
import { integer, pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const meja = pgTable('meja', {
  id: uuid('id').notNull().primaryKey().defaultRandom(),
  number: varchar('number', { length: 50 }).notNull(), // Table number or identifier (e.g., "T01", "A3")
  capacity: integer('capacity').notNull(), // Number of seats
  status: varchar('status', { enum: ['available', 'occupied', 'reserved'] }).notNull().default('available'), // Table status
  location: varchar('location', { enum: ['indoor', 'outdoor'] }).notNull(), // Table location
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const selectMejaSchema = createSelectSchema(meja, {
  status: z.enum(['available', 'occupied', 'reserved']), // Validate status as an enum
  location: z.enum(['indoor', 'outdoor']), // Validate location as an enum
});

export const addMejaSchema = z.object({
  body: selectMejaSchema.pick({
    number: true,
    capacity: true,
    status: true,
    location: true,
  }).partial({ status: true }), // Status defaults to "available"
});

export const updateMejaSchema = z.object({
  body: selectMejaSchema
    .pick({
      number: true,
      capacity: true,
      status: true,
      location: true,
    })
    .partial(), // Allow partial updates
});

export const deleteMejaSchema = z.object({
  params: z.object({
    id: z.string().uuid(), // Delete by table ID
  }),
});

export type Meja = InferSelectModel<typeof meja>;
export type NewMeja = z.infer<typeof addMejaSchema>['body'];
export type UpdateMeja = z.infer<typeof updateMejaSchema>['body'];
