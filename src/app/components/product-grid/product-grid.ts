import {Component, computed, ElementRef, inject, input, OnDestroy, OnInit, signal, viewChild} from '@angular/core';
import {RegisteredComponent} from '@builder.io/sdk-angular';
import {ProductService} from '../../services/product/product.service';
import {Product} from '../../services/product/product.model';
import {delay, of, Subject, takeUntil} from 'rxjs';
import {WindowService} from '../../services/window/window.service';
import {SlicePipe} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {ProductCard} from '../product-card/product-card';

type LabelValuePair = {
  label: string
  value: string
}
type ProductWithFilterKeysAndTags = Pick<Product, 'id' | 'name' | 'image' | 'slug' | 'cms' | 'outOfStock'> & {
  filterKeys: string[]
  tags: { label: string; color: string }[]
}
type FilterType = 'category' | 'useCase' | 'ingredient' | 'tag'
type FilterConfig = Map<
  FilterType,
  {
    label: string
    defaultLabel: string
    selectedOption: LabelValuePair | null
    options: LabelValuePair[]
  }
>

type GenericBuilderReference = {
  id: string
  value: {
    id: string
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: Record<string, any>
  }
}


@Component({
  selector: 'gh-product-grid',
  imports: [
    SlicePipe,
    MatIcon,
    ProductCard
  ],
  templateUrl: 'product-grid.html',
  styles: ``
})
export class ProductGrid implements OnInit, OnDestroy {
  private productService = inject(ProductService);
  private windowService = inject(WindowService)

  protected pageSize = input<number>(12)
  protected showFilters = input<boolean>(true)
  protected showPagination = input<boolean>(true)
  protected products = input<{ product: GenericBuilderReference }[] | null | undefined>(undefined)
  protected initCategoryFilter = input<GenericBuilderReference | null | undefined>(undefined)
  protected initTagFilter = input<GenericBuilderReference | null | undefined>(undefined)
  protected initUseCaseFilter = input<GenericBuilderReference | null | undefined>(undefined)
  protected initIngredientFilter = input<GenericBuilderReference | null | undefined>(undefined)
  protected paginationScrollOffset = input<number>(170)
  protected memberPriceLabel = input<string>('Member Price')
  protected guestPriceLabel = input<string>('Guest Price')
  protected productLinkLabel = input<string>('View Product')
  protected showAddToCartButton = input<boolean>(true)
  protected addToCartLabel = input<string>('Add to Cart')
  protected showLoginButton = input<boolean>(true)
  protected loginButtonText = input<string>('Login to Purchase')
  protected categoryLabel = input<string>('Shop by Category')
  protected tagLabel = input<string>('Shop by Tag')
  protected useCaseLabel = input<string>('Shop by Use Case')
  protected ingredientLabel = input<string>('Shop by Ingredient')
  protected productLinkPrefix = input<string>('p/')
  protected referralPriceLabel = input<string>('Your Price')
  protected showOutOfStock = input<boolean>(true)

  private productCatalog$ = this.productService.hippoCatalog
  private productCatalog = computed<ProductWithFilterKeysAndTags[]>(() => {
    const allProducts = this.productCatalog$.hasValue() ? this.productCatalog$.value() : []
    const availableProducts: ProductWithFilterKeysAndTags[] = []
    if (allProducts && allProducts.length > 0) {
      const productGroups = new Map<string, ProductWithFilterKeysAndTags[]>();
      allProducts.map((product) => {
        const showOutOfStock = this.showOutOfStock() ?? true
        const isOutOfStock = product.outOfStock || product.cms?.cartOutOfStock
        // Skip product if it's out of stock and showOutOfStock is false
        if (isOutOfStock && !showOutOfStock) return

        if (product.cms && !product.cms?.hidden) {
          const keys: string[] = []
          const tags: { label: string; color: string }[] = []
          product.cms?.categories.forEach((c) => {
            keys.push(c.id)
          })
          product.cms?.useCases.forEach((u) => {
            keys.push(u.id)
          })
          product.cms?.tags.forEach((t) => {
            keys.push(t.id)
            tags.push({label: t.name, color: t.color || '#ffeec2b3'})
          })
          product.cms?.ingredients.forEach((i) => {
            keys.push(i.id)
          })
          // Remove duplicates by converting to a Set and back to an Array
          const uniqueKeys = new Set<string>(keys)
          if (product.cms.group) {
            if (!productGroups.has(product.cms.group.id)) {
              productGroups.set(product.cms.group.id, [])
            }
            productGroups.get(product.cms.group.id)?.push({
              ...product,
              filterKeys: Array.from(uniqueKeys),
              tags: tags,
            })
          } else {
            availableProducts.push({
              ...product,
              filterKeys: Array.from(uniqueKeys),
              tags: tags,
            })
          }
        }
      })
      // Add grouped products to the availableProducts array
      productGroups.forEach((group) => {
        if (group.length > 0) {
          const sortedProducts = group.sort((a, b) => a.cms?.group?.sortOrder || 0 - (b.cms?.group?.sortOrder || 0))
          const primaryProduct = sortedProducts[0]
          const allFilterKeys = Array.from(new Set(sortedProducts.flatMap(p => p.filterKeys)))
          const totalReviews = group.reduce((acc, g) => acc + (g.cms?.reviews?.count || 0), 0)
          const totalWeightedReviews = group.reduce((acc, g) => {
            const weightedSum = (g.cms?.reviews?.average || 0) * (g.cms?.reviews?.count || 0)
            return acc + weightedSum
          }, 0)
          const averageReviews = totalReviews > 0 ? totalWeightedReviews / totalReviews : 0
          const uniqueTags = new Map<string, { label: string; color: string }>()
          sortedProducts.forEach((p) => {
            p.tags.forEach((tag) => {
              if (!uniqueTags.has(tag.label)) {
                uniqueTags.set(tag.label, tag)
              }
            })
          })
          const groupProduct: ProductWithFilterKeysAndTags = {
            id: primaryProduct.id,
            name: primaryProduct.cms?.group?.displayName || primaryProduct.name,
            image: primaryProduct.image,
            slug: primaryProduct.slug,
            cms: {
              displayName: primaryProduct.cms?.group?.displayName || primaryProduct.cms?.displayName || '',
              description: primaryProduct.cms?.group?.description || primaryProduct.cms?.description || '',
              subHeading: primaryProduct.cms?.group?.subHeading || primaryProduct.cms?.subHeading || null,
              featuredImage: primaryProduct.cms?.group?.featuredImage || primaryProduct.cms?.featuredImage || null,
              reviews: {
                count: totalReviews,
                average: averageReviews
              },
              quote: primaryProduct.cms?.quote || null,
              //
              categories: primaryProduct.cms?.categories || [],
              useCases: primaryProduct.cms?.useCases || [],
              tags: primaryProduct.cms?.tags || [],
              ingredients: primaryProduct.cms?.ingredients || [],
              //
              hidden: group.every(g => g.cms?.hidden),
              cartOutOfStock: group.every(g => g.cms?.cartOutOfStock),
              group: null,
              slug: primaryProduct.slug,
            },
            outOfStock: group.every(g => g.outOfStock),
            filterKeys: allFilterKeys,
            tags: Array.from(uniqueTags.values()),
          }
          availableProducts.push(groupProduct)
        }
      })

    }
    return availableProducts.sort((a, b) => {
      const aName = a.cms?.displayName || a.name || ''
      const bName = b.cms?.displayName || b.name || ''
      return aName.localeCompare(bName)
    })
  })
  private ingredientFilter = signal<LabelValuePair | null>(null)
  private categoryFilter = signal<LabelValuePair | null>(null)
  private tagFilter = signal<LabelValuePair | null>(null)
  private useCaseFilter = signal<LabelValuePair | null>(null)
  private selectedFilters = computed<string[]>(() => {
    const filters: string[] = []
    const ingFilter = this.ingredientFilter()
    const catFilter = this.categoryFilter()
    const tagFilter = this.tagFilter()
    const useCaseFilter = this.useCaseFilter()
    if (ingFilter) {
      filters.push(ingFilter.value)
    }
    if (catFilter) {
      filters.push(catFilter.value)
    }
    if (tagFilter) {
      filters.push(tagFilter.value)
    }
    if (useCaseFilter) {
      filters.push(useCaseFilter.value)
    }
    return filters
  })
  private availableCategories = computed<LabelValuePair[]>(() => {
    const products = this.productCatalog()
    if (!products) {
      return []
    }
    const categoryToIdMap = new Map<string, string>()
    products.forEach((product) => {
      product.cms?.categories.forEach((category: { id: string; name: string; slug?: string }) => {
        if (!categoryToIdMap.has(category.id)) {
          categoryToIdMap.set(category.id, category.name)
        }
      })
    })
    return this.sortFilterOptions(Array.from(categoryToIdMap.entries()).map(([value, label]) => ({value, label})))
  })
  private availableTags = computed<LabelValuePair[]>(() => {
    const products = this.productCatalog()
    if (!products) {
      return []
    }
    const tagToIdMap = new Map<string, string>()
    products.forEach((product) => {
      product.cms?.tags.forEach((tag: { id: string; name: string }) => {
        if (!tagToIdMap.has(tag.id)) {
          tagToIdMap.set(tag.id, tag.name)
        }
      })
    })
    return this.sortFilterOptions(Array.from(tagToIdMap.entries()).map(([value, label]) => ({value, label})))
  })
  private availableUseCases = computed<LabelValuePair[]>(() => {
    const products = this.productCatalog()
    if (!products) {
      return []
    }
    const useCaseToIdMap = new Map<string, string>()
    products.forEach((product) => {
      product.cms?.useCases.forEach((useCase: { id: string; name: string }) => {
        if (!useCaseToIdMap.has(useCase.id)) {
          useCaseToIdMap.set(useCase.id, useCase.name)
        }
      })
    })
    return this.sortFilterOptions(Array.from(useCaseToIdMap.entries()).map(([value, label]) => ({value, label})))
  })
  private availableIngredients = computed<LabelValuePair[]>(() => {
    const products = this.productCatalog()
    if (!products) {
      return []
    }
    const ingredientToIdMap = new Map<string, string>()
    products.forEach((product) => {
      product.cms?.ingredients.forEach((ingredient: { id: string; name: string }) => {
        if (!ingredientToIdMap.has(ingredient.id)) {
          ingredientToIdMap.set(ingredient.id, ingredient.name)
        }
      })
    })
    return this.sortFilterOptions(Array.from(ingredientToIdMap.entries()).map(([value, label]) => ({value, label})))
  })
  private currentCategoryLabel = computed<string>(() => {
    const filter = this.categoryFilter()
    if (filter && filter.label) {
      return filter.label
    }
    return this.categoryLabel() || 'Shop by Category'
  })
  private currentTagLabel = computed<string>(() => {
    const filter = this.tagFilter()
    if (filter && filter.label) {
      return filter.label
    }
    return this.tagLabel() || 'Shop by Tag'
  })
  private currentUseCaseLabel = computed<string>(() => {
    const filter = this.useCaseFilter()
    if (filter && filter.label) {
      return filter.label
    }
    return this.useCaseLabel() || 'Shop by Use Case'
  })
  private currentIngredientLabel = computed<string>(() => {
    const filter = this.ingredientFilter()
    if (filter && filter.label) {
      return filter.label
    }
    return this.ingredientLabel() || 'Shop by Ingredient'
  })
  filters = computed<FilterConfig>(() => {
    const filters: FilterConfig = new Map<
      FilterType,
      {
        label: string
        defaultLabel: string
        selectedOption: LabelValuePair | null
        options: LabelValuePair[]
      }
    >()
    filters.set('category', {
      label: this.currentCategoryLabel(),
      defaultLabel: this.categoryLabel(),
      selectedOption: this.categoryFilter(),
      options: this.availableCategories(),
    })
    filters.set('useCase', {
      label: this.currentUseCaseLabel(),
      defaultLabel: this.useCaseLabel(),
      selectedOption: this.useCaseFilter(),
      options: this.availableUseCases(),
    })
    filters.set('ingredient', {
      label: this.currentIngredientLabel(),
      defaultLabel: this.ingredientLabel(),
      selectedOption: this.ingredientFilter(),
      options: this.availableIngredients(),
    })
    filters.set('tag', {
      label: this.currentTagLabel(),
      defaultLabel: this.tagLabel(),
      selectedOption: this.tagFilter(),
      options: this.availableTags(),
    })
    return filters
  })
  selectedFilterKey = signal<FilterType | null>(null)
  visibleProducts = computed<ProductWithFilterKeysAndTags[]>(() => {
    const inputProducts = this.products()
    const products = this.productCatalog()
    const selectedFilters = this.selectedFilters()
    if (!products) {
      return []
    }
    const preFilteredProducts = products.filter((p) => {
      if (inputProducts && inputProducts.length > 0) {
        return inputProducts.some(
          (product) => product.product.value.data?.['gh'].slug.toLowerCase() === p.slug.toLowerCase(),
        )
      }
      return true
    })
    if (selectedFilters.length === 0) {
      return preFilteredProducts
    }
    return preFilteredProducts.filter((product) => {
      return selectedFilters.every((filter) => product.filterKeys.includes(filter))
    })
  })
  private pageCount = computed<number>(() => {
    const products = this.visibleProducts()
    if (!products) {
      return 0
    }
    return Math.ceil(products.length / this.pageSize())
  })
  pages = computed<number[]>(() => {
    const count = this.pageCount()
    return Array.from({length: count}, (_, i) => i)
  })
  curPage = signal<number>(0)

  topOfComponent = viewChild<ElementRef<HTMLElement>>('topOfComponent')

  private destroy$ = new Subject<void>()

  public goToPage(page: number): void {
    this.curPage.set(page)
    // Manually scroll after a delay
    of(null)
      .pipe(delay(500), takeUntil(this.destroy$))
      .subscribe(() => {
        const element = this.topOfComponent()?.nativeElement
        if (element) {
          const offset = this.paginationScrollOffset() ?? 170
          const rect = element.getBoundingClientRect()
          const scrollTarget = rect.top + this.windowService.getScrollY() - offset
          this.windowService.scrollTo(scrollTarget, 'smooth')
        }
      })
  }

  ngOnInit(): void {

    const catFilter = this.initCategoryFilter()
    if (catFilter) {
      this.setFilterOption('category', catFilter.id)
    }
    const tagFilter = this.initTagFilter()
    if (tagFilter) {
      this.setFilterOption('tag', tagFilter.id)
    }
    const useCaseFilter = this.initUseCaseFilter()
    if (useCaseFilter) {
      this.setFilterOption('useCase', useCaseFilter.id)
    }
    const ingredientFilter = this.initIngredientFilter()
    if (ingredientFilter) {
      this.setFilterOption('ingredient', ingredientFilter.id)
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

  toggleFilter(filterType: FilterType): void {
    if (this.selectedFilterKey() === filterType) {
      this.selectedFilterKey.set(null)
    } else {
      this.selectedFilterKey.set(filterType)
    }
  }

  clearFilter(filterType: FilterType): void {
    switch (filterType) {
      case 'category':
        this.categoryFilter.set(null)
        break
      case 'tag':
        this.tagFilter.set(null)
        break
      case 'useCase':
        this.useCaseFilter.set(null)
        break
      case 'ingredient':
        this.ingredientFilter.set(null)
        break
    }
    this.selectedFilterKey.set(null)
  }

  setFilterOption(filterType: FilterType, filterId: string): void {
    const filters = this.filters()
    const filterConfig = filters.get(filterType)
    if (!filterConfig) {
      return
    }
    const selectedOption = filterConfig.options.find((option) => option.value.includes(filterId)) || null
    if (!selectedOption) {
      return
    }
    switch (filterType) {
      case 'category':
        this.categoryFilter.set(selectedOption)
        break
      case 'tag':
        this.tagFilter.set(selectedOption)
        break
      case 'useCase':
        this.useCaseFilter.set(selectedOption)
        break
      case 'ingredient':
        this.ingredientFilter.set(selectedOption)
        break
    }
    this.selectedFilterKey.set(null) // Reset selected filter key after setting option
  }

  private sortFilterOptions(options: LabelValuePair[]): LabelValuePair[] {
    return options.sort((a, b) => a.label.localeCompare(b.label))
  }

}

export const PRODUCT_GRID_COMPONENT: RegisteredComponent = {
  component: ProductGrid,
  name: 'BuilderProductGridComponent',
  friendlyName: 'Product Grid',
  description: 'A grid of products with optional filters and pagination',
  meta: {
    selector: 'builder-product-grid',
    standalone: true,
  },
  hideFromInsertMenu: false,
  inputs: [
    {
      name: 'pageSize',
      type: 'number',
      defaultValue: 12,
    },
    {
      name: 'showFilters',
      type: 'boolean',
      defaultValue: true,
    },
    {
      name: 'showPagination',
      type: 'boolean',
      defaultValue: true,
    },
    {
      name: 'showOutOfStock',
      type: 'boolean',
      defaultValue: true,
      friendlyName: 'Show Out of Stock Products',
      description: 'Whether to show products that are out of stock',
    },
    {
      name: 'products',
      type: 'list',
      defaultValue: [],
      folded: true,
      subFields: [
        {
          name: 'product',
          type: 'reference',
          model: 'product',
          required: true,
        },
      ],
      required: false,
    },
    {
      name: 'initCategoryFilter',
      friendlyName: 'Category Filter',
      type: 'reference',
      model: 'product-category',
      defaultValue: null,
      required: false,
    },
    {
      name: 'initTagFilter',
      friendlyName: 'Tag Filter',
      type: 'reference',
      model: 'product-tag',
      defaultValue: null,
      required: false,
    },
    {
      name: 'initUseCaseFilter',
      friendlyName: 'Use Filter',
      type: 'reference',
      model: 'product-use-case',
      defaultValue: null,
      required: false,
    },
    {
      name: 'initIngredientFilter',
      friendlyName: 'Ingredient Filter',
      type: 'reference',
      model: 'product-ingredient',
      defaultValue: null,
      required: false,
    },
    {
      name: 'paginationScrollOffset',
      friendlyName: 'Pagination Scroll Offset',
      type: 'number',
      defaultValue: 170,
      advanced: true,
    },
    {
      name: 'memberPriceLabel',
      friendlyName: 'Member Price Label',
      type: 'string',
      defaultValue: 'Member Price',
    },
    {
      name: 'referralPriceLabel',
      friendlyName: 'Referral Price Label',
      type: 'string',
      defaultValue: 'Your Price',
      description: 'Label for the price shown to users shopping with a referral link (e.g. Aspire)',
    },
    {
      name: 'guestPriceLabel',
      friendlyName: 'Guest Price Label',
      type: 'string',
      defaultValue: 'Guest Price',
    },
    {
      name: 'productLinkLabel',
      friendlyName: 'Product Link Text',
      type: 'string',
      defaultValue: 'View Product',
    },
    {
      name: 'showAddToCartButton',
      friendlyName: 'Show Add to Cart Button',
      type: 'boolean',
      defaultValue: true,
    },
    {
      name: 'addToCartLabel',
      friendlyName: 'Add to Cart Button Text',
      type: 'string',
      defaultValue: 'Add to Cart',
    },
    {
      name: 'showLoginButton',
      friendlyName: 'Show Login Button',
      type: 'boolean',
      defaultValue: true,
    },
    {
      name: 'loginButtonText',
      friendlyName: 'Login Button Text',
      type: 'string',
      defaultValue: 'Login to Purchase',
    },
    {
      name: 'categoryLabel',
      friendlyName: 'Category Filter Label',
      type: 'string',
      defaultValue: 'Shop by Category',
    },
    {
      name: 'tagLabel',
      friendlyName: 'Tag Filter Label',
      type: 'string',
      defaultValue: 'Save on...',
    },
    {
      name: 'useCaseLabel',
      friendlyName: 'Use Case Filter Label',
      type: 'string',
      defaultValue: 'Shop by Health Goal',
    },
    {
      name: 'ingredientLabel',
      friendlyName: 'Ingredient Filter Label',
      type: 'string',
      defaultValue: 'Shop by Ingredient',
    },
    {
      name: 'productLinkPrefix',
      friendlyName: 'Product Link Prefix',
      helperText: 'Provide the prefix for product links without a leading slash (e.g., "p/", "product/")',
      type: 'string',
      defaultValue: 'p/',
      advanced: true
    },
  ],
}
