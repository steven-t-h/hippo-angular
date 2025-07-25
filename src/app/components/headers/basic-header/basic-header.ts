import { Component } from '@angular/core';
import {RouterLink, RouterModule} from '@angular/router';

@Component({
  selector: 'gh-basic-header',
  imports: [
    RouterLink,
    RouterModule
  ],
  template: `
    <header class="bg-white">
      <nav aria-label="Global" class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <div class="flex flex-1">
          <div class="hidden lg:flex lg:gap-x-12">
            <a routerLink="/shop" class="text-sm/6 font-semibold text-gray-900">Shop</a>
          </div>
          <div class="flex lg:hidden">
            <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
              <span class="sr-only">Open main menu</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-slot="icon"
                   aria-hidden="true" class="size-6">
                <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
        <a routerLink="/" class="-m-1.5 p-1.5">
          <span class="sr-only">Golden Hippo</span>
          <h2>
            Golden Hippo
          </h2>
        </a>
        <div class="flex flex-1 justify-end">
          <a routerLink="/login" class="text-sm/6 font-semibold text-gray-900">Log in <span
            aria-hidden="true">&rarr;</span></a>
        </div>
      </nav>
      <!-- Mobile menu, show/hide based on menu open state. -->
      <div role="dialog" aria-modal="true" class="lg:hidden">
        <!-- Background backdrop, show/hide based on slide-over state. -->
        <div class="fixed inset-0 z-10"></div>
        <div class="fixed inset-y-0 left-0 z-10 w-full overflow-y-auto bg-white px-6 py-6">
          <div class="flex items-center justify-between">
            <div class="flex flex-1">
              <button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700">
                <span class="sr-only">Close menu</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-slot="icon"
                     aria-hidden="true" class="size-6">
                  <path d="M6 18 18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
            <a routerLink="/" class="-m-1.5 p-1.5">
              <span class="sr-only">Golden Hippo</span>
              <h2>
                Golden Hippo
              </h2>
            </a>
            <div class="flex flex-1 justify-end">
              <a routerLink="/login" class="text-sm/6 font-semibold text-gray-900">Log in <span aria-hidden="true">&rarr;</span></a>
            </div>
          </div>
          <div class="mt-6 space-y-2">
            <a routerLink="/shop"
               class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Shop</a>
          </div>
        </div>
      </div>
    </header>
  `,
  styles: ``
})
export class BasicHeader {

}
