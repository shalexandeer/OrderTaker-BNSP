import { z } from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const voucherSchema = z.object({
  id: z.string().uuid(),
  voucherName: z.string(),
  pointValue: z.number(),
  pointPrice: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export type Voucher = z.infer<typeof voucherSchema>
