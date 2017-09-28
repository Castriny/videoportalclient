import {Injectable} from '@angular/core';
import {Service} from '../Service';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {Config} from '../../Config/Config';
import {User} from '../../Model/User';

@Injectable()
export class UserService implements Service {
    base_path = 'users';

    get (id: number): Observable<any> {
        return undefined;
    }
    existEmail(model: User) {
        return this.http.post(Config.httpBasePath + 'user-exist-email ', model);

    }
    existName(model: User) {
        return this.http.post(Config.httpBasePath + 'user-exist-name ', model);

    }

    all(): Observable<any> {
        return undefined;
    }

    update(model: any): Observable<any> {
        return undefined;
    }

    save(model: User): Observable<any> {
        return this.http.post(Config.httpBasePath + this.base_path, model);

    }


    constructor(private http: HttpClient) {

    }
}
