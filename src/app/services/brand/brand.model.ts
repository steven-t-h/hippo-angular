import {Locale} from '../locale/locale.model';

export type BrandSetting = {
  name: string;
  pet: {
    dogBreeds: {
      label: string;
      value: string;
    }[];
    catBreeds: {
      label: string;
      value: string;
    }[]
  };
  support: {
    email: string;
    phone: string;
    returnsAddress: string;
    website: string;
  };
  shipping: {
    exclusionRule: string;
    threshold: number;
    cost: {
      domestic: {
        oneTime: number;
        subscription: number;
        myAccountOneTime: number;
        myAccountSubscription: number;
      };
      international: {
        oneTime: number;
        subscription: number;
        myAccountOneTime: number;
        myAccountSubscription: number;
      };
    };
  };
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  availableCountries: {
    name: string;
    code: string;
  }[];
  availableLocales: Locale[],
  contact: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
  };
  subscriptionFrequencies: string[];
}
