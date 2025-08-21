import { isPlatformBrowser, Location } from "@angular/common";
import { inject, Injectable, PLATFORM_ID } from "@angular/core";


declare global {
  interface Window {
    [key: string]: any;
  }
}

@Injectable({
  providedIn: 'root'
})
export class WindowService {
  private platformId = inject(PLATFORM_ID);
  private location = inject(Location)


  public disableConsoleLogs(): void {
    if(isPlatformBrowser(this.platformId) && typeof window !== 'undefined') {
      window.console.log = (): void => { };
    }
  }

  public get nativeWindow(): Window | null {
    if(isPlatformBrowser(this.platformId) && typeof window !== 'undefined') {
      return window;
    } else {
      console.warn('WindowService: Cannot get window on the server');
      return null;
    }
  }

  public get href(): string {
    if(isPlatformBrowser(this.platformId) && typeof window !== 'undefined') {
      return window.location.href;
    } else {
      console.warn('WindowService: Cannot get href on the server');
      return '';
    }
  }

  public get nativeDocument(): Document | null {
    if(isPlatformBrowser(this.platformId) && typeof window !== 'undefined') {
      return window.document;
    } else {
      console.warn('WindowService: Cannot get document on the server');
      return null;
    }
  }

  public get nativeLocation(): globalThis.Location | null {
    if(isPlatformBrowser(this.platformId) && typeof window !== 'undefined') {
      return window.location;
    } else {
      return null;
    }
  }

  public get nativeNavigator(): Navigator | null {
    if(isPlatformBrowser(this.platformId) && typeof window !== 'undefined') {
      return window.navigator;
    } else {
      console.warn('WindowService: Cannot get navigator on the server');
      return null;
    }
  }

  public get scrollY(): number {
    if(isPlatformBrowser(this.platformId) && typeof window !== 'undefined') {
      return window.scrollY ?? 0;
    } else {
      console.warn('WindowService: Cannot get scroll position on the server');
      return 0;
    }
  }

  public get pathname(): string {
    if(isPlatformBrowser(this.platformId) && typeof window !== 'undefined') {
      return window.location.pathname;
    } else {
      console.warn('WindowService: Cannot get pathname on the server');
      return '';
    }
  }

  public get search(): string {
    if(isPlatformBrowser(this.platformId) && typeof window !== 'undefined') {
      return window.location.search;
    } else {
      return this.location.path().split('?')[1] || '';
    }
  }

  public get origin(): string {
    if(isPlatformBrowser(this.platformId) && typeof window !== 'undefined') {
      return window.location.origin;
    } else {
      console.warn('WindowService: Cannot get origin on the server');
      return '';
    }
  }

  public get innerWidth(): number {
    if(isPlatformBrowser(this.platformId) && typeof window !== 'undefined') {
      return window.innerWidth;
    } else {
      console.warn('WindowService: Cannot get inner width on the server');
      return 0;
    }
  }

  public getPropertyByKey(key: string): any {
    if(isPlatformBrowser(this.platformId) && typeof window !== 'undefined') {
      if (key && key.trim() !== '' && window) {
        return window[key] as any;
      } else {
        console.error('WindowService: Key is empty or undefined');
        return null;
      }
    } else {
      //console.warn('WindowService: Cannot get property on the server');
      return null;
    }
  }

  public setPropertyByKey(key: string, value: any): void {
    if(isPlatformBrowser(this.platformId) && typeof window !== 'undefined') {
      if(!key || key.trim() === '') {
        console.error('WindowService: Key is empty or undefined');
        return;
      } else {
        window[key] = value;
      }
    } else {
      //console.warn('WindowService: Cannot set property on the server');
    }
  }

  public getScrollY(): number {
    if(isPlatformBrowser(this.platformId) && typeof window !== 'undefined') {
      return window.scrollY ?? 0;
    } else {
      //console.warn('WindowService: Cannot get scroll position on the server');
      return 0;
    }
  }

  public scrollTo(scrollTarget: number, behavior: string): void {
    if(isPlatformBrowser(this.platformId) && typeof window !== 'undefined') {
      window.scrollTo({
        top: scrollTarget > 0 ? scrollTarget : 0,
        behavior: 'smooth',
      });
    } else {
      //console.warn('WindowService: Cannot scroll on the server');
      return;
    }
  }

  public goTo(url: string): void {
    if(isPlatformBrowser(this.platformId) && typeof window !== 'undefined') {
      window.location.href = url;
    } else {
      //console.warn('WindowService: Cannot navigate on the server');
      return;
    }
  }

  public open(url: string, target: string = '_blank'): void {
    if(isPlatformBrowser(this.platformId) && typeof window !== 'undefined') {
      if (url && url.trim()) {
        window.open(url, target);
      } else {
        console.error('WindowService: Cannot open an empty URL');
      }
    } else {
      //console.warn('WindowService: Cannot open a new window on the server');
      return;
    }
  }

  public postMessage(message: any, targetOrigin: string): void {
    if(isPlatformBrowser(this.platformId) && typeof window !== 'undefined') {
      if(message && targetOrigin) {
        window.postMessage(message, targetOrigin);
      } else {
        console.error('WindowService: Message or target origin is empty');
        return;
      }
    } else {
      //console.warn('WindowService: Cannot post message on the server');
      return;
    }
  }

  public parentPostMessage(message: any, targetOrigin: string): void {
    if(isPlatformBrowser(this.platformId) && typeof window !== 'undefined') {
      if(message && targetOrigin) {
        window.parent.postMessage(message, targetOrigin);
      } else {
        console.error('WindowService: Message or target origin is empty');
        return;
      }
    } else {
      //console.warn('WindowService: Cannot post message to parent on the server');
      return;
    }
  }
}
