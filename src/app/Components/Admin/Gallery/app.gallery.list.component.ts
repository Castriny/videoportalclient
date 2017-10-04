import {Component, OnInit} from '@angular/core';
import {GalleryService} from "../../../Service/GalleryService";
import {PictureGallery} from "../../../Model/PictureGallery";
import {Picture} from "../../../Model/Picture";


@Component({
    selector: 'app-gallery-list',
    templateUrl: './app.gallery.list.component.html',
    providers: [GalleryService]
})
export class AppGalleryListComponent implements OnInit {
    galleryList: Array<PictureGallery> = new Array<PictureGallery>();
    loadingIndicator = true;

    constructor(private _galleryService: GalleryService) {

    }

    getThumbnail(row: Array<Picture>) {
        console.log(row);
        for (const item of row) {
            if (item.titelthumbnail) {
                return item.thumbnail;
            }
        }

    }

    ngOnInit(): void {
        setTimeout(() => {
            this._galleryService.all().subscribe((r: any) => {
                this.loadingIndicator = false;
                for (const item of r) {
                    const model = new PictureGallery();
                    model.id = item.id;
                    model.name = item.name;
                    model.text = item.text;
                    model.pictures = item.pictures;
                    this.galleryList.push(model);


                }


            });
        });
    }
}