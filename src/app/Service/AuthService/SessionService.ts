import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Config} from '../../Config/Config';

@Injectable()
export class SessionService {
    constructor(private http: HttpClient) {


    }

    public authenticate(data: AuthData) {
        return this.http.post(Config.httpBasePath + 'authenticate', data);
    }

    public logout() {
        localStorage.removeItem('token');
    }
}

export class Token {
    private _token: string;

    get token(): string {
        return this._token;
    }

    set token(value: string) {
        this._token = value;
    }
}

export class AuthData {
    private _email: string;
    private _password: string;


    get email(): string {
        return this._email;
    }

    set email(value: string) {
        this._email = value;
    }

    get password(): string {
        return this._password;
    }

    set password(value: string) {
        this._password = value;
    }
}