import {Component, OnInit} from '@angular/core';

import {FileUploader} from 'ng2-file-upload/ng2-file-upload';
import {FileItem} from 'ng2-file-upload';
import {Config} from '../../Config/Config';

const URL = Config.httpBasePath + 'gallery/upload';

@Component({
    selector: 'app-uploadfiles',
    templateUrl: './app.uploadfiles.component.html',
    providers: [],
})
export class AppUploadfilesComponent implements OnInit {

    public responseItems: Array<any> = [];

    public uploader: FileUploader = new FileUploader(
        {
            url: URL,
            authToken: null,
            allowedMimeType: ['image/jpeg'],
            queueLimit: 20

        }
    );
    public hasBaseDropZoneOver = false;


    constructor() {
        console.log(this.uploader);
    }

    public uploadAll() {


        this.uploader.queue.forEach((i: FileItem, index: number) => {

        });


        this.uploader.onBuildItemForm = (item: FileItem, form: FormData) => {



        }


        this.uploader.uploadAll();
    console.log(this.uploader.queue);

    }

    public fileOverBase(e: any): void {
        this.hasBaseDropZoneOver = e;
    }

    ngOnInit(): void {


        this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {

            const responseJson = JSON.parse(response);

            responseJson.preview = false;


            this.responseItems.push(responseJson);

            if(this.responseItems.length === this.uploader.queue.length) {
                console.log("fertig");
                this.uploader.clearQueue();
            }


        };
    }


}