import {Component, OnInit} from '@angular/core';
import {User} from '../../Model/User';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../Service/UserService/UserService';
import {Router} from '@angular/router';


@Component({
    selector: 'app-register',
    templateUrl: './app.register.component.html',
    providers: [UserService]
})
export class AppRegisterComponent implements OnInit {

    model: User = new User();
    registerForm: FormGroup;
    nameAvailable: boolean;
    emailAvailable: boolean;

    constructor(private _userService: UserService, private _router: Router) {
        this.registerForm = new FormGroup({
            name: new FormControl('', [
                Validators.required,
                Validators.minLength(5)
            ]),

            account: new FormGroup({
                email: new FormControl('', [
                    Validators.required,
                    Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')

                ]),
                matchingPassword: new FormGroup({

                    password: new FormControl('', [
                        Validators.required,
                        Validators.minLength(8)
                    ]),
                    passwordConfirm: new FormControl('', [
                        Validators.required,
                        Validators.minLength(8),
                    ]),

                }, this.passwordMatchValidator),

            }, this.emailMatchValidator.bind(this))
        }, this.nameMatchValidator.bind(this));
    }

    private emailMatchValidator(g: FormGroup) {
        const email = g.get('email').value;

        const user = new User();
        if (g.get('email').valid) {
            user.email = email;
            console.log(email);
            this._userService.existEmail(user).subscribe((response: any) => {
                if (response.success) {
                    this.emailAvailable = true;
                }
            }, (response: any) => {
                this.emailAvailable = false;
            });
        }

        return null;
    }

    private nameMatchValidator(g: FormGroup) {
        const name = g.get('name').value;
        const user = new User();
        if (name.length >= 5) {
            user.name = name;
            this._userService.existName(user).subscribe((response: any) => {
                if (response.success) {
                    this.nameAvailable = true;
                }
            }, (response: any) => {
                this.nameAvailable = false;
            });
        }
        return null;

    }

    private passwordMatchValidator(g: FormGroup) {
        return g.get('password').value === g.get('passwordConfirm').value
            ? null : {'mismatch': true};
    }

    onSubmit({value, valid}: { value: any, valid: boolean }) {

        this.model.name = value.name;
        this.model.email = value.account.email;
        this.model.password = value.account.matchingPassword.password;


        this._userService.save(this.model).subscribe((r: any) => {
            if (r.success) {

                this._router.navigate(['/login']);

            }
        }, (error: any) => {

        });
    }

    ngOnInit(): void {
    }
}
