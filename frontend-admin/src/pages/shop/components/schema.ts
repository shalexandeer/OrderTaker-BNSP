import { z } from 'zod'

export const itemMallSchema = z.object({
  id: z.string(),
  itemId: z.number(),
  itemImage: z.string(),
  itemName: z.string(),
  itemDescription: z.string(),
  itemQuantity: z.number(),
  streamerPrice: z.number(),
  cashCoinPrice: z.number(),
  stock: z.number(),
  sold: z.number(),
  isPermanent: z.boolean(),
  isOnSale: z.boolean(),
  durationTimeInMinutes: z.number(),
  itemMallCategories: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      color: z.string(),
    })
  ),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export type ItemMall = z.infer<typeof itemMallSchema>
