import {Observable} from 'rxjs/Observable';

export interface Service {
    base_path: string;


    get(id: number): Observable<any>;

    all(): Observable<any>;

    update(model: any): Observable<any>;

    save(model: any): Observable<any>;
}