import { integer, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { z } from 'zod';
import { createSelectSchema } from 'drizzle-zod';
import type { InferSelectModel } from 'drizzle-orm';
import { orders } from './order';
import { foods } from './food';

export const orderItems = pgTable('order_items', {
  id: uuid('id').notNull().primaryKey().defaultRandom(),
  orderId: uuid('order_id')
    .notNull()
    .references(() => orders.id, { onDelete: 'cascade' }),
  foodId: uuid('food_id')
    .notNull()
    .references(() => foods.id, { onDelete: 'cascade' }),
  quantity: integer('quantity').notNull().default(1),
  price: integer('price').notNull(), // Captures price at order time
  notes: text('notes'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const selectOrderItemsSchema = createSelectSchema(orderItems);

export const addOrderItemSchema = z.object({
  body: selectOrderItemsSchema
    .pick({
      orderId: true,
      foodId: true,
      quantity: true,
      notes: true,
    })
    .partial({ quantity: true }) // Allow default value
    .extend({
      orderId: z.string().uuid(),
      foodId: z.string().uuid(),
      quantity: z.number().int().positive().optional(), // Validate quantity
    }),
});

export const deleteOrderItemSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});

export type OrderItem = InferSelectModel<typeof orderItems>;
export type NewOrderItem = z.infer<typeof addOrderItemSchema>['body'];
