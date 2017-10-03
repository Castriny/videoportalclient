export class Picture {
    private _id: string;
    private _image: string;
    private _thumbnail: string;
    private _preview: boolean;


    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    get image(): string {
        return this._image;
    }

    set image(value: string) {
        this._image = value;
    }

    get thumbnail(): string {
        return this._thumbnail;
    }

    set thumbnail(value: string) {
        this._thumbnail = value;
    }

    get preview(): boolean {
        return this._preview;
    }

    set preview(value: boolean) {
        this._preview = value;
    }
}