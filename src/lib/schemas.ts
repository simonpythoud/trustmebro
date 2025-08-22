import { z } from 'zod'

export const CreateContractSchema = z.object({
  title: z.string().min(3),
  brief: z.string().min(10),
  deliverable: z.object({
    platform: z.enum(['tiktok', 'instagram', 'youtube', 'other']),
    durationSec: z.number().int().positive().max(180),
    hashtags: z.array(z.string()).max(10),
  }),
  creatorId: z.string().min(3),
  budgetCents: z.number().int().min(1000),
  creatorDepositCents: z.number().int().min(0),
  brandDepositCents: z.number().int().min(0),
  productValueCents: z.number().int().min(0),
  deadlineAt: z.string().datetime(),
})

export type CreateContractInput = z.infer<typeof CreateContractSchema>


