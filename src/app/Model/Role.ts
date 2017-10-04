import {Permission} from './Permission';

export class Role {
    private _id: number;
    private _name: string;

    private _permissions: Array<Permission> = new Array<Permission>();


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

    get permissions(): Array<Permission> {
        return this._permissions;
    }

    set permissions(value: Array<Permission>) {
        this._permissions = value;
    }
}