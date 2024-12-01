import { z } from 'zod'

export const applicationProcessSchema = z.object({
  'customer.firstName': z.string().min(5)
})
