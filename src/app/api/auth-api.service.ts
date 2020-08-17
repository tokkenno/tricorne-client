import {Injectable} from '@angular/core';
import {HttpBackend, HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface Session {
    expiredAt: Date;
    token: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthApiService {
    private readonly http: HttpClient;

    constructor(
        httpBackend: HttpBackend
    ) {
        this.http = new HttpClient(httpBackend);
    }

    public getSession(token: string): Observable<Session> {
        return this.http.get<Session>('/api/auth', {
            headers: new HttpHeaders({authorization: `Bearer ${token}`})
        });
    }

    public login(username: string, password: string): Observable<Session> {
        return this.http.post<Session>('/api/auth', { username, password });
    }

    public logout(token: string): Observable<void> {
        return this.http.delete<void>('/api/auth', {
            headers: new HttpHeaders({authorization: `Bearer ${token}`})
        });
    }
}
