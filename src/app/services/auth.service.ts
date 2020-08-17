import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {AuthApiService, Session} from '../api/auth-api.service';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import * as Sha256 from 'sha256';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly sessionChangeEvent: BehaviorSubject<Session> = new BehaviorSubject<Session>(null);
    public readonly sessionChange: Observable<Session> = this.sessionChangeEvent.asObservable();

    constructor(
        private readonly router: Router,
        private readonly authApi: AuthApiService
    ) {
        this.sessionChange.subscribe((session) => {
            if (session == null) {
                this.router.navigate(['/sign-in']);
            } else {
                this.router.navigate(['/']);
            }
        });

        let token: string = localStorage.getItem('jwt.token');
        if (token == null || token === '') {
            token = sessionStorage.getItem('jwt.token');
        }
        if (token != null && token !== '') {
            this.authApi.getSession(token).subscribe((session) => {
                this.setSession(session);
            }, (error) => {
                console.error(error);
                this.setSession(null);
            });
        }
    }

    private setSession(session: Session, remember: boolean = false): void {
        if (session != null) {
            if (remember) {
                localStorage.setItem('jwt.token', session.token);
            } else {
                sessionStorage.setItem('jwt.token', session.token);
            }
        } else {
            localStorage.removeItem('jwt.token');
            sessionStorage.removeItem('jwt.token');
        }
        this.sessionChangeEvent.next(session);
    }

    getSession(): Session {
        return this.sessionChangeEvent.value;
    }

    login(username: string, password: string, remember: boolean = false): Observable<Session> {
        const passwordHashed = Sha256(password);
        return this.authApi.login(username, passwordHashed).pipe(
            tap((session) => {
                this.setSession(session, remember);
            })
        );
    }

    logout(): Promise<void> {
        let result: Promise<void> = new Promise<void>((accept) => accept());
        if (this.sessionChangeEvent.value != null) {
            result = this.authApi.logout(this.sessionChangeEvent.value.token).toPromise();
        }
        this.setSession(null);
        return result;
    }
}
