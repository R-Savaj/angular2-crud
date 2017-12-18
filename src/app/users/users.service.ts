import {Injectable} from '@angular/core';
import {Http, Headers, Response, } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class UsersService {
    baseUrl: string = 'http://localhost:8000/api/'
    constructor(private _http: Http) {}
    getUsers() {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.get(this.baseUrl + 'users', {headers: headers})
            .map(res => res.json());
    }
    createUser(data) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        var info = JSON.stringify(data);
        return this._http.post(this.baseUrl + 'users', info, {headers: headers})
            .map(res => res.json());
    }
    getById(id): Observable<any> {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.get(this.baseUrl + 'users/' + id, {headers: headers})
            .map(res => res.json())
            .catch((error: any) => Observable.throw(error.json().error || error));
    }
    updateUser(data, id) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        var info = JSON.stringify(data);
        return this._http.put(this.baseUrl + 'users/' + id, info, {headers: headers})
            .map(res => res.json());
    }

}
