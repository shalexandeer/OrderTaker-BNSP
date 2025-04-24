import { integer, pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import type { InferSelectModel } from 'drizzle-orm';
import { meja } from './meja';

export const orders = pgTable('orders', {
  id: uuid('id').notNull().primaryKey().defaultRandom(),
  mejaId: uuid('meja_id')
    .notNull()
    .references(() => meja.id, { onDelete: 'cascade' }),
  customerName: varchar('customer_name', { length: 255 }).notNull(),
  customerEmail: text('customer_email').notNull(),
  paymentMethod: varchar('payment_method', {
    length: 50,
    enum: ['cashier', 'online'],
  }).notNull(),
  status: varchar('status', {
    length: 50,
    enum: ['pending', 'approved', 'preparing', 'completed', 'cancelled'],
  }).notNull().default('pending'),
  totalPrice: integer('total_price').notNull().default(0),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const selectOrdersSchema = createSelectSchema(orders, {
  paymentMethod: z.enum(['cashier', 'online']),
  status: z.enum(['pending', 'approved', 'preparing', 'completed', 'cancelled']),
});
export const addOrderSchema = z.object({
  body: selectOrdersSchema
    .pick({
      mejaId: true,
      customerName: true,
      customerEmail: true,
      paymentMethod: true,
      status: true,
    })
    .partial({ status: true }) // Status defaults to 'pending'
    .extend({
      items: z.array(
        z.object({
          foodId: z.string().uuid(),
          quantity: z.number().int().positive(),
          notes: z.string().optional(),
          additionalIds: z.array(z.string().uuid()).optional(),
        }),
      ),
    }),
});
export const updateOrderSchema = z.object({
  body: selectOrdersSchema
    .pick({
      mejaId: true,
      customerName: true,
      customerEmail: true,
      paymentMethod: true,
      status: true,
    })
    .partial(),
});
export const deleteOrderSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});

export type Order = InferSelectModel<typeof orders>;
export type NewOrder = z.infer<typeof addOrderSchema>['body'];
export type UpdateOrder = z.infer<typeof updateOrderSchema>['body'];
