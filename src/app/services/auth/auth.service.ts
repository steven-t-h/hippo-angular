import {computed, Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isLoggedIn = signal<boolean>(true);
  private _loadingAuth = signal<boolean>(false);
  isLoggedIn = computed(() => this._isLoggedIn());
  loading = computed(() => this._loadingAuth());

  async logOut() {
    this._loadingAuth.set(true);
    // Simulate an API call to log out
    await new Promise(resolve => setTimeout(resolve, 1000));
    this._isLoggedIn.set(false);
    this._loadingAuth.set(false);
  }

  async logIn() {
    this._loadingAuth.set(true);
    // Simulate an API call to log in
    await new Promise(resolve => setTimeout(resolve, 1000));
    this._isLoggedIn.set(true);
    this._loadingAuth.set(false);
  }

}
