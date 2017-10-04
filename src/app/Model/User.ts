import {Role} from "./Role";

export class User {
    private _id: number;
    private _name: string;
    private _email: string;
    private _password: string;

    private _roles: Array<Role> = new Array<Role>();

    get roles(): Array<Role> {
        return this._roles;
    }

    set roles(value: Array<Role>) {
        this._roles = value;
    }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

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