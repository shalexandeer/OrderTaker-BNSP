import { z } from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const blockedUsernameSchema = z.object({
  id: z.string(),
  username: z.string(),
  blockedAt: z.string(),
})

export type Users = z.infer<typeof blockedUsernameSchema>
