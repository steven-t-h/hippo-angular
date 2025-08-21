
export type Account = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  secondaryEmail: string | null;
  phone: string | null;
  birthday: string | null;
  loyaltyPoints: {
    rate: number;
    pointsUsed: number;
    pointsPending: number;
    pointsExpiring: number;
    pointsExpired: number;
    pointsAvailable: number;
    dateExpiring: string;
    currentPointsPerDollar: number;
    standardPointsPerDollar: number;
  }
  brandId: string;
  brandName: string;
  priceBook: string | null;
  shippingAddress: Address;
  billingAddress: Address;
  paymentOptions: PaymentOption[];
  defaultPaymentOptionId: string | null;
}

type Address = {
  line1: string;
  line2?: string | null;
  city: string | null;
  region?: string;
  regionCode?: string;
  country: string;
  countryCode?: string;
  postalCode: string;
  firstName: string;
  lastName: string;
  phone?: string | null;
}

export enum Processor {
  paypal = 'PayPal',
  stripe = 'Stripe',
  braintree = 'Braintree',
  cybersource = 'Cybersource',
}

export enum PaymentMethod {
  creditCard = 'Credit Card',
  paypal = 'PayPal',
}

export type PaymentOption = {
  id: string;
  token: string;
  expiration: string | null;
  lastFour: string | null;
  processor: Processor,
  method: PaymentMethod,
  email: string | null;
  currencyCode: string;
}
