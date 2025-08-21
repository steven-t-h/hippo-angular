import * as z from 'zod'


export const ZEnvironment = z.object({
  production: z.boolean(),
  builderApiKey: z.string(),
  brand: z.string(),
  commerceApiUrl: z.url(),
  accountApiUrl: z.url(),
  paymentApiUrl: z.url(),
  apiUser: z.string(),
  apiPassword: z.string(),
})

type Environment = z.infer<typeof ZEnvironment>;

export const environment: Environment = {
  production: false,
  builderApiKey: "cf992cf7343c4ca182a884e9a45f394e",
  brand: "Gundry MD",
  commerceApiUrl: "https://gh-commerce-service-uat-66e8fea4eb20.herokuapp.com",
  accountApiUrl: "/account-service/proxy",
  paymentApiUrl: "/payment-service/proxy",
  apiUser: 'c492314d-ecb5-44ca-91d2-ef71aa51b484',
  apiPassword: 'I8T9eNpZzR2IoJwNzkCCQ6jH1c-OOuX7VNC09xTx41DegyfkZdFe9cGD',
};
