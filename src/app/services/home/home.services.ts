import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class RequestService {
    PATH = '/inicio';
    constructor(private _http: HttpClient) {}    
    getRequest(data: any) {       
        return this._http.post(`${environment.apiUrlAuth}${this.PATH}`, data);
    }
}
