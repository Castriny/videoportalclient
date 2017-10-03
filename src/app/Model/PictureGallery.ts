import {Picture} from "./Picture";

export class PictureGallery {
    private _id:number;
    private _name: string;
    private _text: string;
    private _pictures: Array<Picture> = new Array<Picture>();
    private _size: number;
    private _uploaded: boolean = false;


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

    get text(): string {
        return this._text;
    }

    set text(value: string) {
        this._text = value;
    }

    get pictures(): Array<Picture> {
        return this._pictures;
    }

    set pictures(value: Array<Picture>) {
        this._pictures = value;
    }

    get size(): number {
        return this._size;
    }

    set size(value: number) {
        this._size = value;
    }

    get uploaded(): boolean {
        return this._uploaded;
    }

    set uploaded(value: boolean) {
        this._uploaded = value;
    }
}