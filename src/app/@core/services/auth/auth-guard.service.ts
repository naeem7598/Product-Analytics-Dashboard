import { Injectable } from '@angular/core';
import {CanActivate, Router, UrlTree} from "@angular/router";
import {AuthService} from "./auth.service";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate   {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(): Observable<boolean | UrlTree> {
    return this.auth.isLoggedIn$.pipe(
      map(isLoggedIn => isLoggedIn ? true : this.router.createUrlTree(['/login']))
    );
  }
}
