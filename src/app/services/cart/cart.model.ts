export type Cart = {
  id: string;
  userStatus: 'guest' | 'registered';
  lines: CartLine[];
  discounts: CartDiscount[];
  cost: CartCost;
  shipping: {
    countryCode: string;
    domestic: number;
    domesticLocal: number;
    international: number;
    internationalLocale: number;
  }
  created: string;
  modified: string;
  affParameters: Record<string, string>;
}
export type CartLine = {
  subscription: boolean;
  selectedVariantId: string;
  selectedVariantType: 'oneTimeStandard' | 'oneTimeMyAccount' | 'subscriptionStandard' | 'subscriptionMyAccount';
  name: string;
  familyId: string;
  inStock: boolean;
  image: string | null;
  retailPrice: number | null;
  unit: string;
  unitCount: number;
  taxCode: string;
  variants: {
    id: string;
    sku: string;
    variantType: string;
    price: number;
    rate: number;
    localePrice: number;
    localeRate: number;
  }[];
  restrictedCountries: string[];
  id: string;
  subtotal: number;
  discount: number;
  total: number;
  quantity: number;
  localeDiscount: number;
  localeRetailPrice: number;
  localeSubtotal: number;
  localeTotal: number;
}

export type CartDiscount = {
  id: string;
  code: string;
  amount: number;
  discountType: 'percentage' | 'amount';
  limitType: 'Overall' | 'Per Customer' | null;
  rebillEligible: boolean;
  discountPercent: number | null;
}
export type CartCost = {
  subtotal: number;
  discount: number;
  total: number;
  shipping: number;
  currencyCode: string;
  conversionRate: number;
  taxIncluded: boolean;
}
