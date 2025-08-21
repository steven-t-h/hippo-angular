export type Upsell = {
  type: 'Upsell' | 'Downsell';
  id: string;
  description: string;
  retailPrice: number;
  localeRetailPrice: number;
  salePrice: number;
  localeSalePrice: number;
  tax: number;
  localeTax: number;
  includesTax: boolean;
  product: {
    id: string;
    name: string;
    description: string;
    image: {
      url: string;
      alt: string;
    };
    taxCode: string;
    packaging: string;
    quantity: number;
    friendlyName: string;
    familyId: string;
  };
}
