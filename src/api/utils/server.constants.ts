import * as z from 'zod'

const ZEnvSchema = z.object({
  IS_DEPLOYED: z.coerce.boolean(),
  API_USER: z.string(),
  API_KEY: z.string(),
  BRAND_NAME: z.string(),
  ACCOUNT_API_URL: z.url(),
  COMMERCE_API_URL: z.url(),
  PAYMENT_API_URL: z.url(),
})

//Validates the environment variables
export const envServerSchema = ZEnvSchema.parse({
  IS_DEPLOYED: process.env['NODE_ENV'] === 'production',
  API_USER: process.env['API_USER'],
  API_KEY: process.env['API_KEY'],
  BRAND_NAME: process.env['BRAND_NAME'],
  ACCOUNT_API_URL: process.env['ACCOUNT_API_URL'] ? new URL(process.env['ACCOUNT_API_URL']) : null,
  COMMERCE_API_URL: process.env['COMMERCE_API_URL'] ? new URL(process.env['COMMERCE_API_URL']) : null,
  PAYMENT_API_URL: process.env['PAYMENT_API_URL'] ? new URL(process.env['PAYMENT_API_URL']) : null,
})
