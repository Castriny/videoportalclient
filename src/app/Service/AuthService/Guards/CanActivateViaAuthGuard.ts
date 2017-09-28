import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from '../AuthService';

@Injectable()
export class CanActivateViaAuthGuard implements CanActivate {

    constructor(private _authService: AuthService, private _router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this._authService.isAuthenticated()) {
            return true;
        }
        this._router.navigate(['/login']);
        return false;

    }
}