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
  currency: z.enum(['CHF', 'EUR', 'USD']).optional(),
  budgetCents: z.number().int().min(1000),
  creatorDepositCents: z.number().int().min(0),
  brandDepositCents: z.number().int().min(0),
  productValueCents: z.number().int().min(0),
  deadlineAt: z.string().datetime(),
})

export type CreateContractInput = z.infer<typeof CreateContractSchema>

// Auth & Profile
export const SignUpSchema = z.object({
  name: z.string().min(1).max(80),
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(['brand', 'creator']).default('creator'),
})
export type SignUpInput = z.infer<typeof SignUpSchema>

export const UpdateProfileSchema = z.object({
  companyName: z.string().max(120).nullable().optional(),
  vatId: z.string().max(50).nullable().optional(),
  address: z.string().max(200).nullable().optional(),
  country: z.string().max(2).nullable().optional(),
  searchable: z.boolean().optional(),
  socialTikTok: z.string().max(200).nullable().optional(),
  socialInstagram: z.string().max(200).nullable().optional(),
  socialYouTube: z.string().max(200).nullable().optional(),
  socialTwitter: z.string().max(200).nullable().optional(),
  socialLinkedIn: z.string().max(200).nullable().optional(),
  socialTwitch: z.string().max(200).nullable().optional(),
})
export type UpdateProfileInput = z.infer<typeof UpdateProfileSchema>

export const UpdateSettingsSchema = z.object({
  theme: z.enum(['system', 'light', 'dark']).optional(),
  language: z.string().min(2).max(5).optional(),
  region: z.string().min(2).max(5).optional(),
  timeZone: z.string().min(1).max(60).optional(),
  emailNotifications: z.boolean().optional(),
  marketingEmails: z.boolean().optional(),
})
export type UpdateSettingsInput = z.infer<typeof UpdateSettingsSchema>


