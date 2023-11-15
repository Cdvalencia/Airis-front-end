import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { storage } from '@lib/utils/storage/storage.utils';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { environment } from '../../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    isAuthenticated$ = new BehaviorSubject<boolean>(!!storage.getItem('appSession'));

    constructor(private _http: HttpClient) {
        console.log(environment);
    }

    get isAuthenticated(): boolean {
        return this.isAuthenticated$.getValue();
    }

    autoLogin() {
        this.isAuthenticated$.next(true);
    }

    login(data: any): Observable<any> {
        let PATH = '/user/login';
        return this._http.post(`${environment.apiUrlAuth}${PATH}`, data).pipe(
            map((data: any) => {                
                this.isAuthenticated$.next(true);                
                return data;
            }),
            catchError((error) => {
                if (error.status === 400) {
                    Swal.fire('Login', error.error, 'warning');
                }
                return throwError(error); // Reenviar el error para que otros manejadores también puedan manejarlo
            }),
        );
    }

    logout(): void {
        storage.removeItem('appSession');
        this.isAuthenticated$.next(false);
    }
}
