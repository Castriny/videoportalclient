import {Component, OnInit} from '@angular/core';
import {SessionService} from '../../../Service/AuthService/SessionService';
import {Router} from '@angular/router';
import {AuthService} from "../../../Service/AuthService/AuthService";


@Component({
    selector: 'app-navbar',
    templateUrl: './app.navbar.component.html',
    providers: []
})
export class AppNavbarComponent implements OnInit {

    constructor(private _sessionService: SessionService,
                private _router: Router,
                private _authService: AuthService) {
    }

    ngOnInit(): void {
    }
    isAuthenticated() {
        return this._authService.isAuthenticated();
    }
    logout() {
        this._sessionService.logout();
        this._router.navigate(['/dashboard']);
    }
}