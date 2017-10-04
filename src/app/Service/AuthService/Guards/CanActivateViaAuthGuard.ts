import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from '../AuthService';
import {SessionService} from "../SessionService";

@Injectable()
export class CanActivateViaAuthGuard implements CanActivate {

    constructor(private _authService: AuthService, private _sessionService: SessionService, private _router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        console.log();
        if (this._authService.isAuthenticated() && this._sessionService.hasPermission(route.data.name)) {
            return true;
        }
        this._router.navigate(['/login']);
        return false;

    }
}