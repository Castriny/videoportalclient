import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {AuthService} from '../Service/AuthService/AuthService';

@Injectable()
export class JWTInterceptor implements HttpInterceptor {
    constructor(public auth: AuthService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


        request = request.clone({
            setHeaders: {
                Authorization: 'Bearer ' + this.auth.getToken()
            }
        });
        return next.handle(request);
    }
}