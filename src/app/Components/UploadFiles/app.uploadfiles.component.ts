import {Component, OnInit} from '@angular/core';

import {FileUploader} from 'ng2-file-upload/ng2-file-upload';
import {FileItem} from 'ng2-file-upload';
import {Config} from '../../Config/Config';
import {AuthService} from '../../Service/AuthService/AuthService';
import {ActivatedRoute, Router} from '@angular/router';
import {Picture} from '../../Model/Picture';
import {PictureGallery} from '../../Model/PictureGallery';
import {PictureService} from '../../Service/PictureService';
import {GalleryService} from '../../Service/GalleryService';
import { Location } from '@angular/common';
const URL = Config.httpBasePath + 'gallery/upload';

@Component({
    selector: 'app-uploadfiles',
    templateUrl: './app.uploadfiles.component.html',
    providers: [PictureService, GalleryService],
})
export class AppUploadfilesComponent implements OnInit {

    private maxFileSize = 10000000;
    public model: PictureGallery = new PictureGallery();

    public thumbnail: Picture = null;

    public uploader: FileUploader = new FileUploader(
        {
            url: URL,
            authToken: 'Bearer ' + this._authService.getToken(),
            allowedMimeType: ['image/jpeg'],
            queueLimit: 20

        }
    );
    public hasBaseDropZoneOver = false;

    public removeAll() {

        this.uploader.clearQueue();

        for (const item of this.model.pictures) {
            this.deleteImage(item.id);
        }
        this.model.pictures = [];
    }

    constructor(private _pictureService: PictureService,
                private _authService: AuthService,
                private _router: Router,
                private _galleryService: GalleryService,
                private _route: ActivatedRoute,
                private _location: Location) {
    }

    public changeThumbnail(picture: Picture) {
        this.thumbnail = picture;
        const index = this.model.pictures.indexOf(picture);

        for (const item of this.model.pictures) {
            item.titelthumbnail = false;
        }
        this.model.pictures[index].preview = true;
        this.model.pictures[index].titelthumbnail = true;

    }

    public deleteImage(uuid: string) {

        this._pictureService.delete(uuid).subscribe((r: any) => {
            if (r.success) {
                const deleteItem = this.model.pictures.find(item => (item.id === uuid));
                const deleteIndex = this.model.pictures.indexOf(deleteItem);
                this.model.pictures.splice(deleteIndex, 1);

                if (this.model.pictures.length === 0) {
                    this.uploader.clearQueue();
                }

            } else {
                console.error('Fehler beim Löschen');
            }
        });
    }

    public uploadAll() {
        this.uploader.queue.forEach((i: FileItem, index: number) => {
        });
        this.uploader.onBuildItemForm = (item: FileItem, form: FormData) => {
        };
        this.uploader.uploadAll();
    }

    public onSubmit() {
        this.model.uploaded = true;
        for (const item of this.model.pictures) {
            if (item.titelthumbnail) {
                item.preview = true;
            }
        }

        if (this.model.id) {
            this._galleryService.update(this.model).subscribe((r: any) => {
                this.model.id = r.id;
            });
        } else {
            this._galleryService.save(this.model).subscribe((r: any) => {
                this.model.id = r.id;
            });
        }
        this._router.navigate(['/admin', {outlets: {'adminoutlet': ['gallery']}}]);



    }

    public fileOverBase(e: any): void {
        this.hasBaseDropZoneOver = e;
    }


    ngOnInit(): void {
        this._route.params.subscribe(params => {
            if (params['id']) {
                const id: number = params['id'];
                this._galleryService.get(id).subscribe((r: any) => {

                    this.model.id = r.id;

                    this.model.name = r.name;
                    this.model.text = r.text;
                    for (const p of r.pictures) {
                        const picture = new Picture();
                        picture.id = p.id;
                        picture.thumbnail = p.thumbnail;
                        picture.preview = p.preview;
                        picture.titelthumbnail = p.titelthumbnail;
                        this.model.pictures.push(picture);
                        if (picture.titelthumbnail) {
                            this.thumbnail = picture;
                        }
                    }


                });
            }

            // In a real app: dispatch action to load the details here.
        });
        this._router.events.subscribe((val: any) => {
            if (this.model.pictures.length && this.model.uploaded === false) {
                //this.removeAll();
            }
        });


        this.uploader.onAfterAddingFile = (file) => {

            const fileIndex = this.uploader.queue.indexOf(file);
            if (file.file.size > this.maxFileSize) {
                this.uploader.queue.splice(fileIndex, 1);
            }

            file.withCredentials = false;
        };


        this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
            const responseJson = JSON.parse(response);
            responseJson.preview = false;
            const picture = new Picture();
            picture.id = responseJson.id;
            picture.thumbnail = responseJson.thumbnail;
            picture.preview = responseJson.preview;

            item.formData.push({
                picture
            });


            this.model.pictures.push(picture);

            if (this.model.pictures.length === 1) {
                this.model.pictures[0].preview = true;
                this.model.pictures[0].titelthumbnail = true;
                this.thumbnail = picture;
            }


        };
    }


}
