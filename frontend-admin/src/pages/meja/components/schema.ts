import { z } from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const referralSchema = z.object({
  id: z.string(),
  username: z.string(),
  refferalCode: z.string(),
  referalSendRate: z.number(),
  referalReceiveRate: z.number(),
  referalCount: z.number(),
  referalBalance: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export type Referral = z.infer<typeof referralSchema>
