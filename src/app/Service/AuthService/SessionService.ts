import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Config} from '../../Config/Config';
import {User} from "../../Model/User";
import {Role} from "../../Model/Role";
import {Permission} from "../../Model/Permission";

@Injectable()
export class SessionService {

    private _currentUser: User = null;

    constructor(private http: HttpClient) {

        const user = localStorage.getItem('_currentUser');
        if (user) {
            this.setUser(JSON.parse(user));
        }
    }

    setUser(value: any) {
        const user = new User();
        user.name = value.name;
        user.id = value.id;
        user.email = value.email;

        for (const roleItem of value.roles) {
            const role = new Role();
            role.id = roleItem.id;
            role.name = roleItem.name;

            for (const permissionItem of roleItem.permissions) {
                const permission = new Permission();
                permission.name = permissionItem.name;
                permission.id = permissionItem.id
                role.permissions.push(permission);
            }
            user.roles.push(role);
        }
        this._currentUser = user;
        if (!localStorage.getItem('_currentUser')) {
            localStorage.setItem('_currentUser', JSON.stringify(value));

        }
        console.log(this._currentUser);

    }

    get currentUser(): User {
        return this._currentUser;
    }

    hasPermission(name: string) {
        if (this._currentUser) {
            for (const role of this.currentUser.roles) {
                for (const permission of role.permissions) {
                    if (permission.name === name) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    public authenticate(data: AuthData) {
        return this.http.post(Config.httpBasePath + 'authenticate', data);
    }

    public logout() {
        localStorage.removeItem('_currentUser');
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