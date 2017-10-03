import {Injectable} from '@angular/core';
import {Service} from './Service';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {Config} from '../Config/Config';
import {User} from '../Model/User';
import {PictureGallery} from "../Model/PictureGallery";

@Injectable()
export class GalleryService implements Service {
    base_path = 'gallery';

    get (id: number): Observable<any> {
        return this.http.get(Config.httpBasePath + this.base_path + '/' + id);

    }

    all(): Observable<any> {
        return this.http.get(Config.httpBasePath + this.base_path);
    }


    update(model: any): Observable<any> {
        return this.http.put(Config.httpBasePath + this.base_path + '/' + model.id, model);

    }

    save(model: PictureGallery): Observable<any> {
        return this.http.post(Config.httpBasePath + this.base_path, model);

    }

    constructor(private http: HttpClient) {

    }
}