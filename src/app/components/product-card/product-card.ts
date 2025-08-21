import {Component, inject, input, signal} from '@angular/core';
import {RegisteredComponent} from '@builder.io/sdk-angular';
import {LocaleService} from '../../services/locale/locale.service';
import {AuthService} from '../../services/auth/auth.service';
import {Product} from '../../services/product/product.model';
import {Router, RouterLink} from '@angular/router';
import {ProductService} from '../../services/product/product.service';
import {CurrencyPipe, NgForOf, NgIf, NgStyle} from '@angular/common';

function forceDefault<T>(defaultValue: T) {
  return (value: any): T => {
    return value == null || false || value === 'undefined' ? defaultValue : value;
  };
}

@Component({
  selector: 'gh-product-card',
  imports: [
    RouterLink,
    CurrencyPipe,
    NgStyle,
    NgIf,
    NgForOf
  ],
  templateUrl: 'product-card.html',
  styles: ``
})
export class ProductCard {
  private productService = inject(ProductService);
  private localeService = inject(LocaleService);
  private authService = inject(AuthService);
  private router = inject(Router)

  productId = input<string>();
  tagLabels = input<{ label: string, color: string}[]>([]);
  image = input<string>();
  name = input<string>("Product Name");
  description = input<string>("Product Description");
  rating = input<number>(0)
  reviewCount = input<number>(0)
  guestPriceLabel = input<string>("Guest Price")

  referralPriceLabel = input('', {
    transform: forceDefault<string>('Your Price'),
  });

  priceLabel = input('', {
    transform: forceDefault<string>('Member Price'),
  });

  productSlug= input<string>('/shop');
  productLinkLabel = input<string>('Learn More');
  showAddToCartButton = input<boolean>(false)
  addToCartLabel = input<string>('Add to Cart');
  outOfStockText = 'Out of Stock';
  showLoginButton: boolean = false;
  loginButtonText: string = 'Log in to Pay Member Price';


  public locale = this.localeService.locale();
  public product = signal<Product | undefined>(undefined)
  public isLoggedIn = this.authService.isLoggedIn();
  public forceMyAccountPricing$ = false // TODO

  public fullStarCount: number = 0
  public quartStarCount: number = 0
  public halfStarCount: number = 0
  public threeQuarterStarCount: number = 0

  public fullStars: number[] = [];
  public halfStars: number[] = [];
  public threeQuarterStars: number[] = [];
  public quarterStars: number[] = [];


  public ngOnInit(): void {
    if(!this.productSlug && !this.productId) {
      console.error("No product slug or ID provided to ProductCardComponent");
      return;
    } else {
      const products = this.productService.hippoCatalog.hasValue() ? this.productService.hippoCatalog.value() : [];
      const product = products.find(p =>( p.slug === this.cleanSlug(this.productSlug()) || p.id === this.productId()) );
      if (product) {
        this.product.set(product);
      }
    }
    this.initStarCounts(this.rating() * 4);

  }

  public onAddToCartClicked(product: Product, isLoggedIn: boolean): void {
    alert('Todo')
  }

  public onGoToProductPage(): void {
    this.router.navigate([this.productSlug], {
      queryParamsHandling: 'merge',
    }).then(r => r)
  }

  public onNavigateToPage(slug: string): void {
    this.router.navigate([slug], {
      queryParamsHandling: 'merge',
    }).then(r => r)
  }

  private initStarCounts(rating: number): void {
    this.fullStarCount = Math.floor(rating / 4);
    this.halfStarCount = rating % 4 === 2 ? 1 : 0;
    this.quartStarCount = rating % 4 === 1 ? 1 : 0;
    this.threeQuarterStarCount = rating % 4 === 3 ? 1 : 0;

    this.fullStars = this.fullStarCount > 0 ?  new Array(this.fullStarCount).fill(0) : [];
    this.halfStars = this.halfStarCount > 0 ? new Array(this.halfStarCount).fill(0) : [];
    this.quarterStars = this.quartStarCount > 0 ? new Array(this.quartStarCount).fill(0) : [];
    this.threeQuarterStars = this.threeQuarterStarCount > 0 ? new Array(this.threeQuarterStarCount).fill(0) : [];
  }

  private cleanSlug(slug: string): string {
    if (!slug) {
      return '';
    }
    // Remove 'p/' prefix if it exists
    slug = slug.replace(/^p\//, '');
    // Convert to lowercase
    return slug.toLowerCase();
  }

}

export const PRODUCT_CARD_COMPONENT: RegisteredComponent = {
  component: ProductCard,
  name: "ProductCardComponent",
  hideFromInsertMenu: true,
  meta: {
    selector: "product-card",
    standalone: true,
  },
  inputs: [
    {
      name: "productId",
      type: "string",
    },
    {
      name: "tagLabels",
      type: "list",
      subFields: [
        {
          name: "label",
          type: "string",
        }, {
          name: "color",
          type: "string",
        }
      ]
    },
    {
      name: "image",
      type: "string",
    },
    {
      name: "name",
      type: "string",
      defaultValue: "Product Name",
    },
    {
      name: "description",
      type: "string",
      defaultValue: "Product Description",
    },
    {
      name: "rating",
      type: "number",
    },
    {
      name: "reviewCount",
      type: "number",
    },
    {
      name: "guestPriceLabel",
      type: "string",
      defaultValue: "Guest Price",
    },
    {
      name: "priceLabel",
      type: "string",
      defaultValue: "Member Price",
    },
    {
      name: "productSlug",
      type: "string",
    },
    {
      name: "productLinkLabel",
      type: "string",
    },
    {
      name: "showAddToCartButton",
      type: "boolean",
    },
    {
      name: "addToCartLabel",
      type: "string",
    },
    {
      name: "outOfStockText",
      type: "string",
    },
    {
      name: "showLoginButton",
      type: "boolean",
    },
    {
      name: "loginButtonText",
      type: "string",
    }
  ],
}
