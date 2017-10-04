import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {AuthService} from '../Service/AuthService/AuthService';
import 'rxjs/add/operator/catch';
import {Router} from '@angular/router';


@Injectable()
export class JWTInterceptor implements HttpInterceptor {
    constructor(public auth: AuthService, private _router: Router) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


        request = request.clone({
            setHeaders: {
                Authorization: 'Bearer ' + this.auth.getToken()
            }
        });
        return next.handle(request).catch((res) => {
            if (res.status === 401 || res.status === 403) {
                this._router.navigate(['/login']);

            }
            return next.handle(request);
        });
    }
}