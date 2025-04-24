import type { InferSelectModel } from 'drizzle-orm';
import { pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const categories = pgTable('categories', {
  id: uuid('id').notNull().primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull().unique(),
  img: text('img').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const selectCategorySchema = createSelectSchema(categories, {
  img: schema => schema.img.pipe(
    z.string().refine((val) => {
      const isUrl = val.startsWith('http://') || val.startsWith('https://');
      const isLocalPath = /^[\w\-. /\\]+(?:jpg|jpeg|png|gif|webp)$/i.test(val);
      return isUrl || isLocalPath;
    }, {
      message: 'Image must be a valid URL or file path',
    }),
  ),
});

export const addCategorySchema = z.object({
  body: selectCategorySchema.pick({
    name: true,
    img: true,
  }),
});

export const updateCategorySchema = z.object({
  body: selectCategorySchema
    .pick({
      name: true,
      img: true,
    })
    .partial(),
});

export const deleteCategorySchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});

export type Category = InferSelectModel<typeof categories>;
export type NewCategory = z.infer<typeof addCategorySchema>['body'];
export type UpdateCategory = z.infer<typeof updateCategorySchema>['body'];
