import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {GalleryService} from "../../../Service/GalleryService";
import {AuthService} from "../../../Service/AuthService/AuthService";
import {PictureService} from "../../../Service/PictureService";
import {PictureGallery} from "../../../Model/PictureGallery";
import {DomSanitizer} from "@angular/platform-browser";


@Component({
    selector: 'app-gallery',
    templateUrl: './app.gallery.component.html',
    providers: [GalleryService]
})
export class AppGalleryComponent implements OnInit {

    galleryList: Array<PictureGallery> = new Array<PictureGallery>();
    getBackground(image) {
        return this._sanitizer.bypassSecurityTrustStyle('url(data:image/jpg;base64,'+image+')');
    }
    ngOnInit(): void {
        this._galleryService.all().subscribe((r: any) => {

            for (const item of r) {
                const model = new PictureGallery();
                model.id = item.id;
                model.name = item.name;
                model.text = item.text;
                model.pictures = item.pictures;
                this.galleryList.push(model);


            }

            console.log(this.galleryList);
        });
    }

    constructor(private _authService: AuthService,
                private _router: Router,
                private _galleryService: GalleryService,
                private _route: ActivatedRoute,
                private _sanitizer: DomSanitizer) {
    }

}