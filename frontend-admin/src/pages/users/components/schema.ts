import { z } from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const usersSchema = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string().email(),
  role: z.string(),
  emailConfirmed: z.boolean(),
  emailConfirmedDate: z.string(),
  createdAt: z.string(),
  updatedAt: z.string()
})

export type Users = z.infer<typeof usersSchema>
