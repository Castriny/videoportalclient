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
    model: AuthData = new AuthData;

    ngOnInit(): void {
    }

    onSubmit() {
console.log(this.loginForm.valid);



            this._sessionService.authenticate(this.model).subscribe((response: any) => {
                localStorage.setItem('token', response.token);
                this._router.navigate(['/dashboard']);
            });



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
