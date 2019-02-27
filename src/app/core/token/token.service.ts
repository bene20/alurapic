import { Injectable } from '@angular/core';

const KEY = 'authToken';
@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  hasToken() {
    return !!this.getToken(); //!! é um truque para converter string em booleano
  }

  setToken(token) {
    window.localStorage.setItem(KEY, token);
  }

  getToken() {
    window.localStorage.getItem(KEY);
  }

  removeToken() {
    window.localStorage.removeItem(KEY);
  }
}
