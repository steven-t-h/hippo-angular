export type Product = {
  name: string;
  id: string;
  countryCode: string;
  currencyCode: string;
  brand: string;
  retailPrice: number;
  localeRetailPrice: number;
  taxCode: string;
  description: string | null;
  packaging: {
    singular: string;
    plural: string;
  };
  group: {
    id: string | null;
    name: string | null;
  };
  image: string | null; // URI
  outOfStock: boolean;
  outOfStockEmailList: string | null;
  restockEta: string | null;
  trialFamilyId: string | null;
  category: string | null;
  ingredients: string[];
  concerns: string[];
  upc: string | null;
  restrictedCountries: {
    name: string;
    code: string; // Two-letter country code
  }[];
  products: {
    subscription: PriceLevels;
    oneTime: PriceLevels;
  };
  slug: string;
  reviewId: string | null;
  cms: {
    displayName: string
    description: string
    subHeading: string | null
    featuredImage: string | null
    reviews: {
      count: number
      average: number
    }
    quote: string | null
    categories: {
      id: string
      name: string
      slug?: string
    }[]
    useCases: {
      id: string
      name: string
    }[]
    tags: {
      id: string
      name: string
      color?: string
    }[]
    ingredients: {
      id: string
      name: string
    }[]
    hidden: boolean
    group: {
      id: string
      displayName: string
      description: string
      subHeading: string | null
      featuredImage: string | null
      sortOrder: number
    } | null
    slug: string,
    cartOutOfStock: boolean
  } | null
}

type PriceLevels = {
  standard: ProductVariant[];
  myAccount: ProductVariant[];
  sample: ProductVariant[];
}

export type ProductVariant = {
  name: string;
  productId: string;
  variantId: string;
  sku: string;
  price: number;
  localePrice: number;
  quantity: number | null;
  packageType: string | null;
  alternatePriceLevelPrice: number | null;
  alternatePriceLevelLocalePrice: number | null;
  alternatePurchaseTypePrice: number | null;
  alternatePurchaseTypeLocalePrice: number | null;
  purchaseType: 'One-Time' | 'Subscription';
  priceLevel: 'MyAccount' | 'Standard' | 'Sample';
  savings: number | null;
  localeSavings: number | null;
  //TODO Add new keys to the ProductVariant interface
}
