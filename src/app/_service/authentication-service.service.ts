import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class AuthenticationService {

  private loginStatus: boolean = false;
  public loginStatusChange: EventEmitter<any> = new EventEmitter();
  constructor() { }

  login(account: string, password: string) {
    console.log(account, password);
    this.loginStatus = true;
    return this.loginStatusChange.next(this.loginStatus);
  }
  logout() {
    this.loginStatus = false;
    return this.loginStatusChange.next(this.loginStatus);
  }
}
