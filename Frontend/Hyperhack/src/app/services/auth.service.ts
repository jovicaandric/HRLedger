import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  constructor() { }

  public isAuthenticated(): boolean {
    var email = localStorage.getItem('email');
    // Check whether the token is expired and return
    // true or false
    if (email) return true;
    else return false;
  }

  public login(email: string, password: string): boolean {
    if (email.trim() == "office@startit.rs") {
      localStorage.setItem("email", "office@startit.rs");
      localStorage.setItem("type", "company");
      localStorage.setItem("companyId", "comtrade");
      return true;
    }
  }

}
