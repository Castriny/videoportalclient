import {Injectable} from '@angular/core';
import {Service} from './Service';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {Config} from '../Config/Config';
import {User} from '../Model/User';

@Injectable()
export class PictureService implements Service {
    base_path = 'image';

    get (id: number): Observable<any> {
        return undefined;
    }

    all(): Observable<any> {
        return undefined;
    }

    delete(uuid: any) {
        return this.http.delete(Config.httpBasePath + this.base_path + '/' + uuid);

    }

    update(model: any): Observable<any> {
        return undefined;
    }

    save(model: any): Observable<any> {
        return undefined;
    }

    constructor(private http: HttpClient) {

    }
}