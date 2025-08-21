import {DOCUMENT, inject, Injectable, PLATFORM_ID, REQUEST} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CookieService {
  private _platformId = inject(PLATFORM_ID);
  private _document: Document = inject(DOCUMENT);
  private readonly _request = inject(REQUEST, {optional: true});
  private readonly _documentIsAccessible: boolean = isPlatformBrowser(this._platformId);

  static getCookieRegExp(name: string): RegExp {
    const escapedName: string = name.replace(/([[\]{}()|=;+?,.*^$\\])/gi, '\\$1');

    return new RegExp('(?:^' + escapedName + '|;\\s*' + escapedName + ')=(.*?)(?:;|$)', 'g');
  }

  static safeDecodeURIComponent(encodedURIComponent: string): string {
    try {
      return decodeURIComponent(encodedURIComponent);
    } catch {
      // If decodeURIComponent fails, it is likely just that the string is not encoded, return it as is
      return encodedURIComponent;
    }
  }

  public check(name: string): boolean {
    const cookieName = encodeURIComponent(name);
    const regex: RegExp = CookieService.getCookieRegExp(cookieName);
    return regex.test(this._documentIsAccessible ? this._document.cookie : this._getCookieStringFromSsrRequest() ?? '');
  }

  public get(name: string): string | null {
    if (this.check(name)) {
      const cookieName = encodeURIComponent(name);
      const regExp: RegExp = CookieService.getCookieRegExp(cookieName);
      const result = regExp.exec(this._documentIsAccessible ? this._document.cookie : (this._getCookieStringFromSsrRequest() ?? ''));
      return result?.[1] ? CookieService.safeDecodeURIComponent(result[1]) : null;
    }
    return null;
  }

  public getAll(): { [key: string]: string } {
    const cookies: { [key: string]: string } = {};
    const cookieString: any = this._documentIsAccessible ? this._document?.cookie : this._getCookieStringFromSsrRequest();
    if (cookieString && cookieString !== '') {
      cookieString.split(';').forEach((currentCookie: string) => {
        const [cookieName, cookieValue] = currentCookie.split('=');
        cookies[CookieService.safeDecodeURIComponent(cookieName.replace(/^ /, ''))] = CookieService.safeDecodeURIComponent(cookieValue);
      });
    }
    return cookies;
  }

  public setCookie(name: string, value: string, exdays: number, samesite: string = 'Lax', domain?: string): void {
    if (!this._documentIsAccessible) {
      //console.warn(`CookieService: Document is not accessible, cannot set cookie ${name}.`);
      return;
    }
    let d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = 'expires=' + d.toUTCString();
    if (domain && domain != '') {
      this._document.cookie = name + '=' + value + ';' + expires + `;domain=${domain};path=/;SameSite=${samesite};${samesite === 'None' ? 'Secure' : ''}`;
    } else {
      this._document.cookie = name + '=' + value + ';' + expires + `;path=/;SameSite=${samesite};${samesite === 'None' ? 'Secure' : ''}`;
    }
  }

  public setCookieWithExpiryInstant(name: string, value: string, expiryInstant: number, samesite: string = 'Lax', domain?: string): void {
    if (!this._documentIsAccessible) {
      //console.warn('CookieService: Document is not accessible, cannot set cookie.');
      return;
    }
    let d = new Date();
    d.setTime(expiryInstant);
    let expires = 'expires=' + d.toUTCString();
    if (domain && domain != '') {
      this._document.cookie = name + '=' + value + ';' + expires + `;domain=${domain};path=/;SameSite=${samesite};${samesite === 'None' ? 'Secure' : ''}`;
    } else {
      this._document.cookie = name + '=' + value + ';' + expires + `;path=/;SameSite=${samesite};${samesite === 'None' ? 'Secure' : ''}`;
    }
  }

  public deleteCookie(name: string): void {
    if (this._documentIsAccessible) {
      this._document.cookie = name + `=; expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/`;
    }
  }

  public deleteCookieFromDomain(name: string, domain: string): void {
    if (this._documentIsAccessible) {
      this._document.cookie = name + `=; expires=Thu, 01 Jan 1970 00:00:01 GMT;domain=${domain};path=/`;
    }
  }

  /** Safely gets cookie string from SSR request headers */

  private _getCookieStringFromSsrRequest(): string | null {
    if (!this._request || !this._request.headers) {
      return null;
    }
    const headers = this._request.headers;
    // Check for Headers object with .get()
    if (typeof headers.get === 'function') {
      return headers.get('cookie');
    }
    // Check for a plain object with 'cookie' or 'Cookie' key
    if (typeof headers === 'object') {
      // @ts-ignore
      return headers['cookie'] || headers['Cookie'] || null;
    }
    return null; // Unexpected headers format
  }

}
