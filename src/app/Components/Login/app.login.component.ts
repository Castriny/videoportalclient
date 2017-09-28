import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthData, SessionService} from '../../Service/AuthService/SessionService';


@Component({
    selector: 'app-login',
    templateUrl: './app.login.component.html',
    providers: [SessionService]
})
export class AppLoginComponent implements OnInit {
    loginForm: FormGroup;

    ngOnInit(): void {
    }

    onSubmit({value, valid}: { value: any, valid: boolean }) {

        if (this.loginForm.valid) {
            const authData = new AuthData();
            authData.email = value.email;
            authData.password = value.password;
            this._sessionService.authenticate(authData).subscribe((response: any) => {
                localStorage.setItem('token', response.token);
                this._router.navigate(['/dashboard']);
            });
        }

        console.log(value);
    }

    constructor(private _router: Router, private _sessionService: SessionService) {
        this.loginForm = new FormGroup({
            email: new FormControl('', [
                Validators.required,
                Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
            ]),
            password: new FormControl('', [
                Validators.required,

            ]),
        });
    }
}
